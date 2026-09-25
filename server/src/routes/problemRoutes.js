import express from "express";

import {
  getProblems,
  getProblemById,
} from "../controllers/problemController.js";

const router = express.Router();

router.get("/", getProblems);

router.get("/:id", getProblemById);

export default router;