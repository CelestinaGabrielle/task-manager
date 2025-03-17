import React from "react";
import styles from "./TaskList.module.css";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onComplete }) => {
  console.log("Tarefas recebidas no TaskList:", tasks); // Verifica as tarefas recebidas
  
  if (!tasks || tasks.length === 0) {
    return <p className={styles.noTasks}>Nenhuma tarefa encontrada.</p>;
  }

  return (
    <div className={styles.taskList}>
      <h2>Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={styles.taskItem}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </div>
            <div>
              <button onClick={() => onEdit(task)}>Editar</button>
              <button onClick={() => onDelete(task._id)}>Excluir</button>
              {task.status === "pending" && (
                <button onClick={() => onComplete(task._id)}>Marcar como Concluída</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
