import mongoose, { Schema, Document } from "mongoose";

// Interface para tipagem da Tarefa
interface ITask extends Document {
  title: string;
  description: string;
  status: "pending" | "completed";
}

// Definindo o esquema da Tarefa
const taskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending", enum: ["pending", "completed"] },
  },
  {
    timestamps: true, // Cria createdAt e updatedAt automaticamente
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
