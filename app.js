const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const {User} = require('./Models/User');
const {Listboard} = require('./Models/Listboard')
const {Todo} = require('./Models/Todo');
const { application } = require('express');

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  credentials: true,
};

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

    // get GoogleLogin Req (to get token)
    app.post('/login', async(req, res) => {
      console.log('accepting Access Token');
      const {access_token} = req.body;
      console.log(access_token);
      const data = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=emailAddresses%2Cnames`, {
        headers: {
          Authorization : `Bearer ${access_token}`
        }
      })
      const {names, emailAddresses} = data.data;
      console.log(names, emailAddresses);
      console.log(emailAddresses[0].value);
      const user = await User.findOne({userID : emailAddresses[0].value}).exec();
      if(user) {
        console.log('user exists, data is',user);
        // if a user already exist, send a loginDetail, and userIdToken
        res.status(200).json({username : user.username, userAvatarUrl : user.avatarUrl, userIdToken : user._id});
      } else {
        // if a user doesn't exist, send a userInfo for user to sign up
        res.status(200).json({name : names[0].displayName, email : emailAddresses[0].value});
      }
    })

    // GET https://people.googleapis.com/v1/people/me?personFields=emailAddresses%2Cnames&key=[YOUR_API_KEY] HTTP/1.1

    // Authorization: Bearer [YOUR_ACCESS_TOKEN]
    // Accept: application/json
    

    // add New User & granting Login
    app. post('/newuser', async(req, res) => {
      console.log('accepting user data', req.body);
      const {userData} = req.body;
        const newUser = await User.create(userData);
        console.log('created new user ', newUser);
        const userInfo = {username : newUser.username, userAvatarUrl : newUser.avatarUrl, userIdToken : newUser._id};
        res.status(201).json(userInfo);
    })


    // get userinfo by userId
    app.post('/userinfo', async (req, res) => {
      console.log('userID : ',  req.body)
      const { userId } = req.body;
      const userInfo = await User.findById(userId).populate({path : 'listboards', populate : {path : 'todos'}});
      console.log(userInfo);
      console.log('sending userinfo');
      res.json(userInfo);
    })

    // get user listboards by listId
    app.post('/listboards/:listid', async(req, res) => {
      console.log('received listId', req.body, req.params);
      const {userId} = req.body;
      const {listid} = req.params;
      const todoList = await Listboard.findById(listid).populate('todos');
      console.log(todoList);
      res.json(todoList);
    })

    // create new todo
    app.post('/listboards/:listid/create/newtodo', async(req, res) => {
      console.log('creating newTodo', req.body, req.params);
      const {todoData} = req.body;
      const {listid} = req.params;
      const newTodo = await Todo.create(todoData);
      console.log(newTodo);
      const listboard = await Listboard.findById(listid);
      listboard.todos.push(newTodo._id);
      await newTodo.save();
      await listboard.save();
      res.status(201).send('successfully created');
    })

    //create new listboard
    app.post('/listboards/create/newlistboard', async(req, res) => {
      console.log('creating new listboard');
      const {listboardData, userId} = req.body;
      console.log(listboardData, userId);
      const newListboard = await Listboard.create(listboardData);
      const user = await User.findById(userId);
      user.listboards.push(newListboard._id);
      await user.save()
      res.status(201).send('successfully created');
      // const userData = User.findById(userId).populate({path : 'listboards', populate : {path: 'todos'}});
      // res.json(userData);
    })

    // delete todo
    app.delete('/listboards/:listid', async(req,res) => {
      console.log('deleting requested todo', req.body);
      const {todoId, listId} = req.body;
      console.log('todoid', todoId, 'listId', listId);
      const listboard = await Listboard.findById(listId);
      listboard.todos = listboard.todos.filter((todo) => todo.toHexString() !== todoId);
      await listboard.save();
      await Todo.findByIdAndDelete(todoId);
      res.status(201).send('successfully deleted');
    })

    // delete listboards
    app.delete('/listboards/', async(req,res) => {
      console.log('deleting requested listboard');
      const {listboardId, userIdToken} = req.body;
      const listboard = await Listboard.findById(listboardId);
      listboard.todos.forEach(async (todoId) => {
        await Todo.findByIdAndDelete(todoId);
      })
      const user = await User.findById(userIdToken);
      user.listboards = user.listboards.filter((listboard) => listboard.toHexString() !== listboardId)
      await user.save();
      await Listboard.findByIdAndDelete(listboardId);
      res.status(201).send('successfully deleted');
    })

    // update todo by todoId
    app.patch('/listboards/:listid', async(req, res) => {
      const {todoId, todoData} = req.body;
      console.log('updating request recieved', todoId, todoData);
      const todo = await Todo.findByIdAndUpdate(todoId, todoData, {new : true});
      console.log('found and update result', todo);
      res.json(todo);
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