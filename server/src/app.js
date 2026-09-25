import express from "express";
import cors from "cors";

import problemRoutes from "./routes/problemRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173","https://lld-practice-platform-s5uc.onrender.com"]
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "LLD Practice Platform API is running",
  });
});

app.use("/api/problems", problemRoutes);
app.use("/api/attempts", attemptRoutes);

export default app;