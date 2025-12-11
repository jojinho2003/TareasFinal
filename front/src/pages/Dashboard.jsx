import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchTasks } from '../services/taskService';
import { fetchCategories } from '../services/categoryService';

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [taskCount, setTaskCount] = useState(0);
  const [catCount, setCatCount] = useState(0);

useEffect(() => {
  if (!token) return;
  loadInfo();
}, []); // se ejecuta siempre que entrás al dashboard


  const loadInfo = async () => {
    const tasks = await fetchTasks(token);
    const cats = await fetchCategories();

    setTaskCount(tasks.length || 0);
    setCatCount(cats.length || 0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p><strong>Tareas creadas:</strong> {taskCount}</p>
      <p><strong>Categorías creadas:</strong> {catCount}</p>

      <p>Bienvenido, tu panel está funcionando 👍</p>
    </div>
  );
}
