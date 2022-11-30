const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  index : Number,
  todo : String,
  priority : Number,
  date : Date,
  done : Boolean
})

module.exports.Listboard = new mongoose.Model('Listboard', listboardSchema);