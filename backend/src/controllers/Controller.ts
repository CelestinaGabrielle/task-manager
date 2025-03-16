import { Request, Response } from "express";
import Task from "../models/Model";

// Criar tarefa
export const createTask = async (req: Request, res: Response): Promise<Response> => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({ title, description });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error: unknown) {  // Aqui o tipo de 'error' é unknown
    // Verificar se o erro tem a propriedade 'message'
    if (error instanceof Error) {
      console.error("Erro ao criar tarefa:", error.message);
      return res.status(500).json({ message: "Erro ao criar tarefa", error: error.message });
    } else {
      console.error("Erro desconhecido:", error);
      return res.status(500).json({ message: "Erro desconhecido ao criar tarefa" });
    }
  }
};

// Listar tarefas
export const getTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao listar tarefas:", error.message);
      return res.status(500).json({ message: "Erro ao listar tarefas", error: error.message });
    } else {
      console.error("Erro desconhecido:", error);
      return res.status(500).json({ message: "Erro desconhecido ao listar tarefas" });
    }
  }
};

// Atualizar tarefa
export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    return res.status(200).json(updatedTask);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao atualizar tarefa:", error.message);
      return res.status(500).json({ message: "Erro ao atualizar tarefa", error: error.message });
    } else {
      console.error("Erro desconhecido:", error);
      return res.status(500).json({ message: "Erro desconhecido ao atualizar tarefa" });
    }
  }
};

// Deletar tarefa
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    return res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao excluir tarefa:", error.message);
      return res.status(500).json({ message: "Erro ao excluir tarefa", error: error.message });
    } else {
      console.error("Erro desconhecido:", error);
      return res.status(500).json({ message: "Erro desconhecido ao excluir tarefa" });
    }
  }
};
