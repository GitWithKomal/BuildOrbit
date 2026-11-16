import express from "express";
import "dotenv/config";
import client from "prom-client";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Collect default metrics (CPU, Memory, etc.)
client.collectDefaultMetrics();

// Define custom Prometheus metrics
const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 0.7, 1, 2, 5, 10]
});

// Middleware to measure response duration and record it
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on("finish", () => {
    const diff = process.hrtime(start);
    const duration = diff[0] + diff[1] / 1e9;
    
    // Normalize path to avoid high cardinality metrics
    let route = req.baseUrl;
    if (req.route) {
      route += req.route.path;
    } else if (req.path) {
      route = req.path;
    } else {
      route = "unknown";
    }
    
    httpRequestDurationSeconds
      .labels(req.method, route, res.statusCode)
      .observe(duration);
  });
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Up and Running." });
});

// Expose Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is Up and Running on Port: ", PORT);
});
