import express from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enhanced logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalSend = res.send;
  res.send = function (data) {
    if (res.statusCode < 400) {
      capturedJsonResponse = data;
    }
    return originalSend.call(this, data);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${capturedJsonResponse}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Setup Vite or static serving
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Enhanced server startup
  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`🚀 DeepGuard server running on port ${PORT}`);
    log(`🔍 AI-powered deepfake detection ready`);
    log(`📊 Enhanced analysis features enabled`);
  });
})();