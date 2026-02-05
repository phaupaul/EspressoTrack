import express from "express";
import { registerRoutes } from "../dist/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

registerRoutes(app);

export default app;
