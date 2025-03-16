import express, { Request, Response, RequestHandler } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/Controller";

const router = express.Router();

// Definindo as rotas
router.post("/tasks", createTask as unknown as RequestHandler);
router.get("/tasks", getTasks as unknown as RequestHandler);
router.put("/tasks/:id", updateTask as unknown as RequestHandler);
router.delete("/tasks/:id", deleteTask as unknown as RequestHandler);

export default router;
