import React, { useEffect, useState, useContext } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { fetchCategories } from '../services/categoryService';
import { AuthContext } from '../context/AuthContext';

export default function Tasks() {
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!token) return;
    loadTasks();
    loadCategories();
  }, [token]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(token);
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setMsg('Error cargando tareas');
    }
  };

  const loadCategories = async () => {
    try {
      const c = await fetchCategories();
      setCategories(Array.isArray(c) ? c : []);
    } catch {
      setMsg('Error cargando categorías');
    }
  };

  const onCreate = async () => {
    if (!title) return alert('Título requerido');

    const res = await createTask(token, { 
      title, 
      description: '', 
      category: categoryId || null 
    });

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
    if (res._id) loadTasks();
  };

  const onDelete = async (id) => {
    if (!window.confirm('¿Borrar tarea?')) return;

    // FIX: deleteTask no devuelve JSON, así que no esperamos nada.
    await deleteTask(token, id);

    loadTasks();
  };

  const openEditModal = (task) => {
    setEditingTask({
      ...task,
      category: task.category?._id || '' 
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const saveEdit = async () => {
    const res = await updateTask(token, editingTask._id, {
      title: editingTask.title,
      category: editingTask.category || null
    });

    if (!res._id) {
      alert(res.msg || 'Error actualizando');
      return;
    }

    loadTasks();
    closeModal();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tareas</h2>

      {msg && <p style={{ color: 'red' }}>{msg}</p>}

      <div style={{ marginBottom: 20 }}>
        <input 
          placeholder="Título" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />

        <select 
          value={categoryId} 
          onChange={e => setCategoryId(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="">Sin categoría</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <button 
          onClick={onCreate}
          style={{ marginLeft: 10 }}
        >
          Crear tarea
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(t => (
          <li 
            key={t._id}
            style={{ 
              marginBottom: "18px",
              padding: "14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <strong>{t.title}</strong>
              {t.category?.name && ` — ${t.category.name}`}
            </div>

            <div>
              <button 
                onClick={() => openEditModal(t)}
                style={{ 
                  marginRight: 8,
                  padding: "6px 10px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px"
                }}
              >
                Editar
              </button>

              <button 
                onClick={() => onDelete(t._id)}
                style={{ 
                  padding: "6px 10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px"
                }}
              >
                Borrar
              </button>
            </div>

          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">

            <h2>Editar Tarea</h2>

            <input 
              value={editingTask.title}
              onChange={e => setEditingTask({ 
                ...editingTask, 
                title: e.target.value 
              })}
            />

            <select
              value={editingTask.category}
              onChange={e =>
                setEditingTask({
                  ...editingTask,
                  category: e.target.value
                })
              }
            >
              <option value="">Sin categoría</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <button 
              onClick={saveEdit}
              style={{ 
                marginTop: 15,
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px"
              }}
            >
              Guardar cambios
            </button>

            <button 
              onClick={closeModal}
              style={{ 
                marginTop: 15,
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px"
              }}
            >
              Cancelar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}


