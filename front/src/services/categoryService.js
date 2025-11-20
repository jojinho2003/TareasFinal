const API = 'http://localhost:5000/api/categories';

export const fetchCategories = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createCategory = async (token, body) => {
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
