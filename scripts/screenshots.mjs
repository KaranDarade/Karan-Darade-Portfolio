import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "src", "data", "projects.json");
const outputDir = path.join(__dirname, "..", "public", "projects");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function main() {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const project of data) {
    const slug = project.slug;
    const url = project.deploymentUrl;
    const outputPath = path.join(outputDir, `${slug}.png`);

    process.stdout.write(`Capturing ${project.title}... `);

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: outputPath, fullPage: false });
      await page.close();

      project.imageUrl = `/projects/${slug}.png`;
      console.log("✓");
    } catch (err) {
      console.log(`✗ (${err.message})`);
    }
  }

  await browser.close();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log("\nDone! Screenshots saved and projects.json updated.");
}

main().catch(console.error);
