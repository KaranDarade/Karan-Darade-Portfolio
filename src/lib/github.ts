const GITHUB_API = "https://api.github.com";

function getToken() {
  return process.env.GITHUB_TOKEN || "";
}

function headers() {
  const h: Record<string, string> = { Accept: "application/vnd.github.v3+json" };
  const token = getToken();
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

export async function getRepoInfo(owner: string, repo: string) {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, { headers: headers() });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return {
    description: data.description || "",
    topics: data.topics || [],
    htmlUrl: data.html_url,
  };
}

export async function getRepoLanguages(owner: string, repo: string): Promise<string[]> {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/languages`, { headers: headers() });
  if (!res.ok) return [];
  const data = await res.json();
  return Object.keys(data).sort((a, b) => (data[b] as number) - (data[a] as number));
}

export async function getRepoReadme(owner: string, repo: string): Promise<string> {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme`, { headers: headers() });
  if (!res.ok) return "";
  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}
