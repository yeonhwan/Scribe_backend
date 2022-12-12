const mongoose = require('mongoose');

const listboardSchema = new mongoose.Schema({
  listname : {
    type :String,
    default : 'Untiteld List'
  },
  description : {
    type : String,
    default : 'describe your todo listboard'},
  todos : [{
    type : mongoose.ObjectId,
    ref : 'Todo'
  }]
})

module.exports.Listboard = new mongoose.model('Listboard', listboardSchema);