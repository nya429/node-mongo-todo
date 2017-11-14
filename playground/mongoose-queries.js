/*jslint esversion:6*/
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require('./../server/models/user');


const findUserById = (id) => {
    User.findById(id).then(user => {
        if(!user)
            return console.log('id not found');

        console.log(JSON.stringify(user,undefined,2));
    }).catch(e => console.log(e));
};

let id = '5a0a06287abccaa82bb1d1ce';

if(!ObjectID.isValid(id)) {                  //Validator
    return console.log('ID not valid')
} else {
    findUserById(id);
}





//Query: findById
// Todo.findById(id).then(todos => {
//     if(!todos)
//         return console.log('id not found');
//     console.log('findById Todos',todos);
// }).catch(e => console.log(e));
//Query: find
// Todo.find(filter).then(todos => {
//     console.log('find Todos',todos);
// });
//Query: findOne
// Todo.findOne(filter).then(todos => {
//     console.log('findOne Todos',todos);
// });
