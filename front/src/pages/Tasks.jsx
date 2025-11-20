import React, { useEffect, useState, useContext } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { fetchCategories } from '../services/categoryService';
import { AuthContext } from '../context/AuthContext';

export default function Tasks() {
  const { token } = useContext(AuthContext);

  // Estados inicializados correctamente
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  // Mensaje para debug / errores
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!token) return; // si no hay token, no hace fetch
    loadTasks();
    loadCategories();
  }, [token]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(token);
      console.log("TASKS FETCHED:", data); // Para ver qué llega del backend
      setTasks(Array.isArray(data) ? data : []); // asegurar que sea array
    } catch (error) {
      console.error(error);
      setMsg('Error cargando tareas');
    }
  };

  const loadCategories = async () => {
    try {
      const c = await fetchCategories();
      console.log("CATEGORIES FETCHED:", c);
      setCategories(Array.isArray(c) ? c : []); // asegurar que sea array
    } catch (error) {
      console.error(error);
      setMsg('Error cargando categorías');
    }
  };

  const onCreate = async () => {
    if (!title) return alert('Título requerido');
    const res = await createTask(token, { title, description: '', category: categoryId || null });
    if (res._id) {
      setTitle('');
      setCategoryId('');
      loadTasks();
    } else {
      alert(res.msg || 'Error creando tarea');
    }
  };

  const onToggleDone = async (task) => {
    const res = await updateTask(token, task._id, { done: !task.done });
    if (res._id) loadTasks(); else alert(res.msg || 'Error');
  };

  const onDelete = async (id) => {
    if (!window.confirm('Borrar tarea?')) return;
    const res = await deleteTask(token, id);
    if (res.msg) loadTasks(); else alert(res.msg || 'Error');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tareas</h2>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}

      <div>
        <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <option value="">Sin categoría</option>
          {Array.isArray(categories) && categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <button onClick={onCreate}>Crear tarea</button>
      </div>

      <ul>
        {Array.isArray(tasks) && tasks.map(t => (
          <li key={t._id}>
            <input type="checkbox" checked={t.done} onChange={() => onToggleDone(t)} />
            <strong>{t.title}</strong> {t.category?.name ? `— ${t.category.name}` : ''}
            <button onClick={() => onDelete(t._id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
