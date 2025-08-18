import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

export async function setupVite(app, server) {
  const vite = await (await import("vite")).createServer({
    root: path.resolve(__dirname, ".."),
    logLevel: isProduction ? "error" : "info",
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: 3001,
      },
    },
    appType: "spa",
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
}

export function serveStatic(app) {
  const distPath = path.resolve(__dirname, "..", "dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Please run "npm run build" before starting the production server.`
    );
  }

  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

export function log(message) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [express] ${message}`);
}