import express from "express";

import {
  createAttempt,
  updateAttempt,
  submitAttempt,
  getAttempt,
  getAttempts,
} from "../controllers/attemptController.js";

const router = express.Router();

router.get("/", getAttempts);

router.post("/", createAttempt);

router.get("/:id", getAttempt);

router.put("/:id", updateAttempt);

router.post("/:id/submit", submitAttempt);

export default router;