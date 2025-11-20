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
    const tasks = await Task.find({ user: req.user }).populate('category');
    res.json(tasks);
  } catch (err) {
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
