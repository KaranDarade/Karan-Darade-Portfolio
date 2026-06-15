import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const GRADIENTS: [string, string][] = [
  ["#6366f1", "#a855f7"],
  ["#8b5cf6", "#ec4899"],
  ["#06b6d4", "#3b82f6"],
  ["#10b981", "#06b6d4"],
  ["#f59e0b", "#ef4444"],
  ["#8b5cf6", "#06b6d4"],
  ["#ec4899", "#f97316"],
  ["#a855f7", "#3b82f6"],
];

function pickGradient(title: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function generatePlaceholderDataUrl(title: string): string {
  const [c1, c2] = pickGradient(title);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect x="0" y="0" width="1280" height="44" fill="rgba(0,0,0,0.2)"/>
  <circle cx="20" cy="22" r="5" fill="rgba(255,255,255,0.4)"/>
  <circle cx="38" cy="22" r="5" fill="rgba(255,255,255,0.4)"/>
  <circle cx="56" cy="22" r="5" fill="rgba(255,255,255,0.4)"/>
  <rect x="76" y="14" width="320" height="16" rx="8" fill="rgba(255,255,255,0.12)"/>
  <text x="640" y="370" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-size="52" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">${escapeXml(title)}</text>
  <text x="640" y="430" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-size="18" fill="rgba(255,255,255,0.6)" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">Preview</text>
</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg, "utf-8").toString("base64")}`;
}

export async function captureScreenshot(url: string, slug: string, title?: string): Promise<string> {
  if (fs.existsSync(CHROME_PATH)) {
    try {
      const outputDir = path.join(process.cwd(), "public", "projects");
      fs.mkdirSync(outputDir, { recursive: true });
      const extPath = path.join(outputDir, `${slug}.png`);
      const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 2000));
      await page.screenshot({ path: extPath, fullPage: false });
      await page.close();
      await browser.close();
      return `/projects/${slug}.png`;
    } catch {
      // fall through to data URL
    }
  }

  return generatePlaceholderDataUrl(title || slug);
}
