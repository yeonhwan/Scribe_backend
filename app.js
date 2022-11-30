const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const {User} = require('./Models/User');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/todoApp');
    app.use(express.urlencoded({extended : true}));
    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => {
      console.log('getting home root request');
      res.send('you are reaching to the todoApp Server');
    })

    app.post('/userinfo', async (req, res) => {
      console.log('userID : ',  req.body)
      const { userId } = req.body;
      const userInfo = await User.findById(userId);
      console.log('sending userinfo');
      res.json(userInfo);
    })

    app.post('/listboards/:listid', async(req, res) => {
      console.log('received listId', req.body, req.params);
      const {userId} = req.body;
      console.log(userId);
      const {listid} = req.params;
      const todoList = (await User.findById(userId)).userData.listBoards.filter((list) => list._id.toString() === listid);
      // console.log('todoList : ', todoList);
      res.json(todoList[0]);
    })

    app.patch('/listboards/:listid', async(req, res) => {
      const {userId, todoId, newTodo} = req.body;
      const {listId} = req.params;
      console.log('updating request recieved', userId, todoId, newTodo);
      const userData = (await User.find({_id : todoId}))
      console.log(userData);
      res.send('returning response');
    })

    app.listen(5862, () => {
      console.log('todoApp server is hosting on http://localhost:5862');
    })
  } 
  catch(err) {
    console.log('unexpected error occured');
    console.log(err);
  }

}

main();