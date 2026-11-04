// Browser smoke test for the production build.
// Serves dist/ with `vite preview`, loads it in headless Chromium at desktop and
// phone sizes, and fails on anything a visitor would notice as broken.
//
// Usage: npm run build && npm run test:smoke
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { chromium } from "playwright";

const PORT = Number(process.env.SMOKE_PORT ?? 4174);
const BASE = `http://localhost:${PORT}`;
const EXPECTED_SECTIONS = [
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "achievements",
  "testimonials",
  "contact",
];
const VIEWPORTS = {
  desktop: { width: 1366, height: 900 },
  mobile: { width: 390, height: 844 },
};

if (!existsSync("dist/index.html")) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

const failures = [];
const fail = (where, msg) => failures.push(`[${where}] ${msg}`);
const sameOrigin = (url) => url.startsWith(BASE);

const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort"],
  { stdio: "ignore", detached: true },
);
const stopServer = () => {
  try {
    process.kill(-server.pid);
  } catch {}
};

async function waitForServer(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(BASE)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`vite preview did not start on ${BASE}`);
}

// Collect errors caused by our own code/assets. Third-party hosts (e.g. image
// placeholders) are out of our control and may be unreachable in CI.
function watchErrors(page, where) {
  page.on("pageerror", (e) => fail(where, `uncaught error: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const url = m.location()?.url ?? "";
    if (url && !sameOrigin(url)) return;
    fail(where, `console error: ${m.text()}`);
  });
  page.on("response", (r) => {
    if (sameOrigin(r.url()) && r.status() >= 400) {
      fail(where, `HTTP ${r.status()} for ${r.url()}`);
    }
  });
}

async function checkHome(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  watchErrors(page, name);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });

  const h1 = (await page.textContent("h1"))?.trim();
  if (!h1) fail(name, "hero <h1> is empty or missing");

  const ids = await page.$$eval("section[id]", (s) => s.map((x) => x.id));
  for (const id of EXPECTED_SECTIONS) {
    if (!ids.includes(id)) fail(name, `section #${id} missing`);
  }

  // Performance invariant from CLAUDE.md: hero avatar fetched at high priority.
  const prio = await page
    .locator('img[src*="profile"]')
    .first()
    .getAttribute("fetchpriority");
  if (prio !== "high") fail(name, `avatar fetchpriority is "${prio}", expected "high"`);

  // Scroll through so whileInView sections mount, then check layout.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 0) fail(name, `page scrolls sideways by ${overflow}px`);

  // Theme toggle: the visible one flips the <html> class and persists it.
  await page.evaluate(() => window.scrollTo(0, 0));
  if (name === "mobile") await page.getByRole("button", { name: "Toggle menu" }).click();
  const toggle = page.locator('button[aria-label="Toggle theme"]:visible').first();
  const before = await page.evaluate(() => document.documentElement.className);
  await toggle.click();
  const after = await page.evaluate(() => document.documentElement.className);
  const stored = await page.evaluate(() => localStorage.getItem("color-theme"));
  if (before === after) fail(name, `theme toggle did not change <html> class ("${before}")`);
  else if (!after.includes(stored ?? "")) fail(name, `theme "${stored}" not persisted`);

  await page.close();
}

async function check404(browser) {
  const page = await browser.newPage();
  watchErrors(page, "404");
  await page.goto(`${BASE}/404.html`, { waitUntil: "networkidle" });
  const text = (await page.textContent("body")) ?? "";
  if (!text.includes("404")) fail("404", "404 page does not render");
  await page.close();
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch();
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    await checkHome(browser, name, viewport);
  }
  await check404(browser);
} catch (e) {
  fail("runner", e.stack ?? String(e));
} finally {
  await browser?.close();
  stopServer();
}

if (failures.length) {
  console.error(`Smoke test FAILED (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Smoke test passed: desktop, mobile, theme toggle, 404.");
