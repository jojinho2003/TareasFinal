import React, { useEffect, useState, useContext } from 'react';
import { fetchCategories, createCategory } from '../services/categoryService';
import { AuthContext } from '../context/AuthContext';

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchCategories();
    setCats(data);
  };

  const onCreate = async () => {
    if (!name) return alert('Name required');
    const data = await createCategory(token, { name, description: '' });
    if (data._id) {
      setName(''); load();
    } else alert(data.msg || 'Error');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Categorías</h2>
      <div>
        <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={onCreate}>Crear</button>
      </div>
      <ul>
        {cats.map(c => (<li key={c._id}>{c.name} - {c.description}</li>))}
      </ul>
    </div>
  );
}

