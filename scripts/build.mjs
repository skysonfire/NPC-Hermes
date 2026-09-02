/**
 * Production build.
 *
 * Exists so the build is identical on any shell (PowerShell, cmd, bash) — env
 * prefixes like `FOO=bar next build` are bash-only and silently do nothing on
 * Windows.
 *
 * Emits the static export to dist/ (see distDir in next.config.ts), which is
 * the directory wrangler.jsonc deploys.
 */
import { spawnSync } from "node:child_process";
import { rmSync, existsSync } from "node:fs";

const DIST = "dist";

// Clear the previous export so a deleted page cannot linger in a deploy.
if (existsSync(DIST)) {
  try {
    rmSync(DIST, { recursive: true, force: true });
  } catch (err) {
    console.error(
      `\nCould not clear ${DIST}/ — ${err.code || err.message}.\n` +
        `Something is holding the directory open (a dev server, a terminal ` +
        `sitting inside it, or a file watcher). Close it and re-run.\n`
    );
    process.exit(1);
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  console.warn(
    "\nNEXT_PUBLIC_SITE_URL is not set — canonical URLs, OpenGraph tags and the\n" +
      "sitemap will fall back to the default in src/lib/site.ts.\n"
  );
}

const res = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_DIST_DIR: DIST },
});

process.exit(res.status ?? 1);
