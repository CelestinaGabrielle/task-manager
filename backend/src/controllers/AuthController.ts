import { Request, Response } from "express";

export const login = (req: Request, res: Response): Response => {
  const { email, password } = req.body;

  // Simulação de autenticação
  if (email === "admin@example.com" && password === "password") {
    return res.status(200).json({ message: "Login bem-sucedido" });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
};
