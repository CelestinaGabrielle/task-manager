import React, { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "_id">) => void;
  task: { _id?: string; title: string; description: string; status: "pending" | "completed" };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Título</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className={styles.input} 
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Descrição</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className={styles.textarea} 
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Status</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value as "pending" | "completed")}
          className={styles.select}
        >
          <option value="pending">Pendente</option>
          <option value="completed">Concluída</option>
        </select>
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>
          {task._id ? "Atualizar Tarefa" : "Adicionar Tarefa"}
        </button>
        <button type="button" onClick={handleClear} className={styles.clearButton}>
          Limpar Campos
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
