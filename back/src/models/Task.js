const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  done: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
