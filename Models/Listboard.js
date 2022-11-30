const mongoose = require('mongoose');

const listboardSchema = new mongoose.Schema({
  listName : String,
  description : String,
  todos : [{
    type : mongoose.ObjectId,
    ref : 'Todo'
  }]
})

module.exports.Listboard = new mongoose.Model('Listboard', listboardSchema);