// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves this site from the custom domain root (startupsetup.in),
// not a /digital-craft-studio/ subpath, so asset URLs stay at base "/" — same
// as local dev and the normal Cloudflare build. This flag only swaps the nitro
// preset to a plain Node server so the export script can boot it locally and
// snapshot the rendered HTML into static docs/ output; Cloudflare's own build
// stays on the cloudflare-module preset.
const isGithubPagesBuild = process.env["GITHUB_PAGES_BUILD"] === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(isGithubPagesBuild ? { nitro: { preset: "node-server" } } : {}),
});
