import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "src", "data", "projects.json");
const outputDir = path.join(__dirname, "..", "public", "projects");

async function main() {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  });

  for (const project of data) {
    const slug = project.slug;
    const url = project.deploymentUrl;
    const outputPath = path.join(outputDir, `${slug}.png`);

    console.log(`Capturing ${project.title}...`);

    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: outputPath, fullPage: false });
      await page.close();

      project.imageUrl = `/projects/${slug}.png`;
      console.log(`  ✓ Saved ${slug}.png`);
    } catch (err) {
      console.error(`  ✗ Failed to capture ${url}: ${err.message}`);
    }
  }

  await browser.close();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log("\nDone! Screenshots saved and projects.json updated.");
}

main().catch(console.error);
