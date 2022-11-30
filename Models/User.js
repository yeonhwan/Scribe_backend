const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userData : {
    userName : String,
    avatarUrl : String,
    listBoards : [{
      listName : String,
      description : String,
      todos : [{
        index : Number,
        todo : String,
        priorities : Number,
        date : Date,
        done : Boolean
      }]
    }]
  }
})

module.exports.User = new mongoose.model('User', userSchema);
