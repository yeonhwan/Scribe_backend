const mongoose = require('mongoose');
const {User} = require('./Models/User');;

mongoose.connect('mongodb://localhost:27017/todoApp');

const seeds = new User({
  userData: {
    userName : 'anonimous_user',
    avatarUrl : 'https://randomuser.me/api/portraits/women/12.jpg',
    listBoards : [{
      listName : 'Untitled list',
      description : 'description goes here...',
      todos : [
        {index : 0,
         todo : 'drink milk',
         priorities : 1,
         date : new Date(2022, 10, 23),
         done : true,
        },
        {index : 1,
         todo : 'buy another milk',
         priorities : 2,
         date : new Date(2022, 10, 24),
         done : false,
        },
        {index : 2,
         todo : 'go shopping',
         priorities : 3,
         date : new Date(2022, 10, 24),
         done : true,
        },
      ]
    }]
  }
})

console.log(User);
console.log(seeds);


User.deleteMany({}).
then(() => {
  console.log('removing previous database');
  seeds.save()
})
.then(() => {
  console.log('initiating datbase');
  console.log('saved your seeds');
})
.catch((e) => {
  console.log('error occured : ', e);
})