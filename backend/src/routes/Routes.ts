import express, { RequestHandler } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/Controller";
import { login } from "../controllers/AuthController";

const router = express.Router();

// Definindo as rotas
router.post("/tasks", createTask as unknown as RequestHandler);
router.get("/tasks", getTasks as unknown as RequestHandler);
router.put("/tasks/:id", updateTask as unknown as RequestHandler);
router.delete("/tasks/:id", deleteTask as unknown as RequestHandler);

// Adicionando a rota de login
router.post("/login", login as unknown as RequestHandler);

export default router;
