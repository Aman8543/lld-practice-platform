import express from "express";
import cors from "cors";

import problemRoutes from "./routes/problemRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";

const app = express();

// app.use(
//   cors({
//     origin:"http://localhost:5173",
//   })
// );

app.use(
  cors({
    origin:"https://lld-practice-platform-ruddy-theta.vercel.app/api",
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