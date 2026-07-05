import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Deploy target — Netlify serverless functions
  nitro: {
    preset: "netlify",
  },
  plugins: [
    {
      name: "serve-static-admin-bypass",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ? req.url.split("?")[0] : "";
          if (url === "/admin" || url === "/admin/" || url === "/admin/index.html") {
            const filePath = path.join(process.cwd(), "public", "admin", "index.html");
            if (fs.existsSync(filePath)) {
              res.setHeader("Content-Type", "text/html");
              res.end(fs.readFileSync(filePath));
              return;
            }
          }
          next();
        });
      },
    },
  ],
});
