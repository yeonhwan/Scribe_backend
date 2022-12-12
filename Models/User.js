const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {type : String, required : true},
  avatarUrl : String,
  userID : {type : String, required : true},
  listboards : [{
    type : mongoose.ObjectId,
    ref : 'Listboard'
  }]
})

module.exports.User = new mongoose.model('User', userSchema);
