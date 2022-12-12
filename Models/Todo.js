const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo : {
    type : String,
    required : true
  },
  priority : {
    type : Number,
    default : null,
  },
  date : {
    type : Date,
    default : null
  },
  done : {
    type : Boolean,
    default : false
  }
})

module.exports.Todo = new mongoose.model('Todo', todoSchema);