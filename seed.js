const mongoose = require('mongoose');
const {User} = require('./Models/User');
const {Listboard} = require('./Models/Listboard');
const {Todo} = require('./Models/Todo');

mongoose.connect('mongodb://localhost:27017/todoApp');

// console.log(User, Listboard, Todo);
const init = async() => {
  try {
    // await User.deleteMany()
    // await Listboard.deleteMany()
    // await Todo.deleteMany()
    
    // const user = new User({
    //   username: 'mangoman',
    //   avatarUrl : 'https://randomuser.me/api/portraits/men/34.jpg'
    // })
    // await user.save()

    // const listboard1 = new Listboard({
    //   listname : 'study plan',
    //   description : 'I will study'
    // })
    // await listboard1.save()

    // const listboard2 = new Listboard({
    //   listname : 'mango plan',
    //   description : '100 ways to eat mangos'
    // })
    // await listboard2.save()

    // const todo1 = new Todo ({
    //   todo : 'eat mango',
    //   priority : 0,
    //   date : new Date(2021, 10, 10),
    //   done : true
    // })
    // await todo1.save()

    // const todo2 = new Todo ({
    //   todo : 'buy mango',
    //   priority : 1,
    //   date : new Date(2021, 10, 10),
    //   done : false
    // })
    // await todo2.save()

    // const todo3 = new Todo ({
    //   todo : 'study web',
    //   priority : 2,
    //   date : new Date(2021, 10, 10),
    //   done : false
    // })
    // await todo3.save()

    // -------------------------------------------------------------------------
    
    // const user = await User.findOne({username: 'mangoman'})
    // const listboard1 = await Listboard.findOne({listname: 'mango plan'});
    // const listboard2 = await Listboard.findOne({listname: 'study plan'});
    // const todo1 = await Todo.findOne({priority: 0}); 
    // const todo2 = await Todo.findOne({priority: 1});
    // const todo3 = await Todo.findOne({priority: 2});
    // user.listboards = [listboard1._id, listboard2._id];
    // listboard1.todos = [todo1._id, todo2._id];
    // listboard2.todos = [todo3._id];

    // await user.save()
    // await listboard1.save()
    // await listboard2.save()

    const user = await User.findOne({username : 'mangoman'}).populate({path : 'listboards', populate : {path : 'todos'}})
    console.log(user);
  }
 catch(err) {
  console.log('initiating failed : ', err);
 }

}


init();