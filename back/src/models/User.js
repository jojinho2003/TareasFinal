const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Email inválido"]
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

