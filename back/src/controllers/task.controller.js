const Task = require('../models/Task');
const Category = require('../models/Category');

exports.create = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    if (!title) return res.status(400).json({ msg: 'Title required' });
    const task = new Task({
      title, description, dueDate: dueDate || null,
      category: category || null,
      user: req.user // middleware sets req.user (id)
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllByUser = async (req, res) => {
  try {
    const { category, done, due, expired } = req.query;

    // Base: solo tareas del usuario autenticado
    const query = { user: req.user };

    // Filtrar por categoría
    if (category) {
      query.category = category;
    }

    // Filtrar por estado (done=true / done=false)
    if (done === "true") query.done = true;
    if (done === "false") query.done = false;

    // Filtrar por fecha límite > hoy o < hoy
    if (due === "future") {
      query.dueDate = { $gt: new Date() };
    }
    if (due === "past") {
      query.dueDate = { $lt: new Date() };
    }

    // Tareas vencidas: fecha < hoy y done = false
    if (expired === "true") {
      query.dueDate = { $lt: new Date() };
      query.done = false;
    }

    const tasks = await Task.find(query).populate('category');
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getOne = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('category');
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.user.toString() !== req.user) return res.status(403).json({ msg: 'Forbidden' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.user.toString() !== req.user) return res.status(403).json({ msg: 'Forbidden' });

    const { title, description, done, dueDate, category } = req.body;
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.done = typeof done === 'boolean' ? done : task.done;
    task.dueDate = dueDate ?? task.dueDate;
    task.category = category ?? task.category;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.user.toString() !== req.user) return res.status(403).json({ msg: 'Forbidden' });
    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
