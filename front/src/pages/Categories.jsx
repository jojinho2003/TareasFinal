import React, { useEffect, useState, useContext } from 'react';
import { 
  fetchCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../services/categoryService';
import { AuthContext } from '../context/AuthContext';

export default function Categories() {
  const { token } = useContext(AuthContext);

  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchCategories();
    setCats(Array.isArray(data) ? data : []);
  };

  const onCreate = async () => {
    if (!name) return alert('Nombre requerido');

    const res = await createCategory(token, { 
      name, 
      description 
    });

    if (res._id) {
      setName('');
      setDescription('');
      load();
    } else {
      alert(res.msg || 'Error creando categoría');
    }
  };

  const openEditModal = (cat) => {
    setEditingCat({ ...cat });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCat(null);
  };

  const saveEdit = async () => {
    const res = await updateCategory(token, editingCat._id, {
      name: editingCat.name,
      description: editingCat.description
    });

    if (!res._id) {
      alert(res.msg || 'Error actualizando');
      return;
    }

    load();
    closeModal();
  };

  const onDelete = async (id) => {
    if (!window.confirm("¿Eliminar categoría?")) return;

    const res = await deleteCategory(token, id);

    if (res.msg) load();
    else alert(res.msg || "Error");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Categorías</h2>

      <div style={{ marginBottom: 20 }}>
        <input 
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input 
          placeholder="Descripción (opcional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ marginLeft: 10 }}
        />

        <button 
          onClick={onCreate}
          style={{ marginLeft: 10 }}
        >
          Crear
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {cats.map(c => (
          <li 
            key={c._id}
            style={{ 
              marginBottom: "14px",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <strong>{c.name}</strong>
              {c.description && ` — ${c.description}`}
            </div>

            <div>
              <button 
                onClick={() => openEditModal(c)}
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
                onClick={() => onDelete(c._id)}
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
            
            <h2>Editar Categoría</h2>

            <input
              value={editingCat.name}
              onChange={e =>
                setEditingCat({ 
                  ...editingCat, 
                  name: e.target.value 
                })
              }
            />

            <input
              value={editingCat.description}
              onChange={e =>
                setEditingCat({
                  ...editingCat,
                  description: e.target.value
                })
              }
              placeholder="Descripción"
            />

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


