/*jslint esversion:6*/
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require('./../server/models/user');

//  .remove({})
// 1 pass in a argument 
// 2 remove the collections match the query
// compare with Todo.find()
// CANNOT pass an empty argument to expect remove all collections 
// Todo.remove().then( todo=> {
//     console.log(todo)
// }).catch(e => console.log(e));

// //.findOneAndRemove
// Todo.findOneAndRemove({_id: '5a0b6e419303b631cccbf92e'}).then( todo=> {
//     console.log(todo)
// }).catch(e => console.log(e));


//findByIdAndRemove
Todo.findByIdAndRemove('5a0b6e419303b631cccbf92e').then( todo=> {
    console.log(todo)
}).catch(e => console.log(e));
