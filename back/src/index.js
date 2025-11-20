require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/tasks', require('./routes/task.routes'));


// Rutas
app.use('/api/auth', require('./routes/auth.routes'));

app.get('/', (req, res) => res.json({ msg: "API funcionando" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
