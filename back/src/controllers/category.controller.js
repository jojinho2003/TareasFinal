const Category = require('../models/Category');

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ msg: 'Name is required' });
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ msg: 'Category already exists' });
    const cat = new Category({ name, description });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ msg: 'Not found' });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const cat = await Category.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!cat) return res.status(404).json({ msg: 'Not found' });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Category removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
