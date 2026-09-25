import axios from "axios";

const api = axios.create({
  baseURL: "https://lld-practice-platform-s5uc.onrender.com"||"http://localhost:5000/api"
});

export const getProblems = () =>
  api.get("/problems");

export const getProblem = (id) =>
  api.get(`/problems/${id}`);

export const createAttempt = (problemId) =>
  api.post("/attempts", {
    problemId,
  });

export const getAttempt = (id) =>
  api.get(`/attempts/${id}`);

export const updateAttempt = (id, solution) =>
  api.put(`/attempts/${id}`, {
    solution,
  });

export const submitAttempt = (id) =>
  api.post(`/attempts/${id}/submit`);

export const getAttempts = () =>
  api.get("/attempts");