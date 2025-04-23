const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// สร้าง Schema สำหรับ User
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 
  }
});

// สร้างโมเดลจาก Schema
const User = mongoose.model('User', userSchema);

module.exports = User;
