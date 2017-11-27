/*jslint esversion:6 */
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo'); 
const {User} = require('./../../models/user'); 

//dummy todo data

let secret = '123abc';
let userOneId = new ObjectID();
let userTwoId = new ObjectID();

const users = [{
    _id: userOneId, 
    email:"one@email.com",
    password:'oneTimePad',
    tokens: [{
        access:'auth',
        token: jwt.sign({
            _id: userOneId, 
            access: 'auth'
        }, secret).toString()
    }]
},{
    _id: userTwoId, 
    email:"two@email.com",
    password:'twoTimePad'
}];

//dummy user data
const todos = [{
    _id: new ObjectID(), 
    'text':"todo test first"
},{
    _id: new ObjectID(),
    'text':"todo test second",
    'completed':true,
    'completedAt':123456
}
];

const  populateTodos = (done) => {            //run some code before each descript script
    Todo.remove({})                           //remove({})  wipe all todos;
      .then(() => {
        Todo.insertMany(todos);
    }).then(() => done());                 
};

const populateUsers = done => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};