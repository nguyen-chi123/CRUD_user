const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  id: {type: Number,},  // required: true, unique: true, immutable: true,
  username: {type: String,}, //required: true, trim: true, maxlength: 100,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  birthday: {
    type: String
  },
  gender: {type: String,}, //enum: ['male', 'female', 'unknow']
  address: {type: String,},
  phone: {type: String,}
}, {
  timestamps: true
});

module.exports = mongoose.model('User', User)