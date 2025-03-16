import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/connection";
import taskRoutes from "./routes/Routes";

// Configurações do ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Conectar ao MongoDB
    await connectDB();
    
    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Rotas
    app.use("/api", taskRoutes);

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();
