import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./Form/TaskForm";
import TaskList from "./List/TaskList";
import styles from "./App.module.css";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Função para buscar tarefas
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      console.log("Tarefas carregadas:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Função para adicionar tarefa
  const addTask = async (task: Omit<Task, "_id">) => {
    await axios.post("http://localhost:5000/api/tasks", task);
    fetchTasks();
  };

  // Função para excluir tarefa
  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  // Função para editar tarefa
  const editTask = (task: Task) => {
    setEditingTask(task);
  };

  // Função para atualizar tarefa
  const updateTask = async (task: Omit<Task, "_id">) => {
    if (editingTask) {
      // Atualiza a tarefa com o ID da tarefa que está sendo editada
      await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, task);
      fetchTasks();
      setEditingTask(null);
    }
  };

  // Função para marcar tarefa como concluída
  const completeTask = async (id: string) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: "completed" });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.appContainer}>
      <h1>Task Manager</h1>
     
        {/* Passa a função onSubmit para atualizar ou adicionar, conforme o caso */}
        <TaskForm 
          onSubmit={editingTask ? updateTask : addTask} 
          task={editingTask || { title: "", description: "", status: "pending" }} 
        />
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onEdit={editTask}
          onComplete={completeTask} // Passando a função onComplete
        />
      </div>

  );
};

export default App;
