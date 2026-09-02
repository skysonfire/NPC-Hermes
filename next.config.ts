import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Build output directory. `next dev` keeps the default .next; production
  // builds set NEXT_DIST_DIR=dist (see the `build` script) so the deployable
  // static export lands in dist/, which is what wrangler.jsonc serves.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
