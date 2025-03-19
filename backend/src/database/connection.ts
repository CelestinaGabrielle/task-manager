import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// Gerencia a conexão com o banco de dados
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); 
  }
};

export default connectDB;
