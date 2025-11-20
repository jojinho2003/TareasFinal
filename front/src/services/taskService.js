const API = 'http://localhost:5000/api/tasks';

export const fetchTasks = async (token) => {
  const res = await fetch(API, { headers: { 'Authorization': `Bearer ${token}` } });
  return res.json();
};

export const createTask = async (token, body) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return res.json();
};

export const updateTask = async (token, id, body) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return res.json();
};

export const deleteTask = async (token, id) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};
