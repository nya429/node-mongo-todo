/*jslint esversion:6*/
const express= require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

//POST todos
app.post('/todos',(req,res) => {
    console.log('request body: ',req.body);
    
    let newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then(doc => {
        res.status(200).send(doc);
    }, err => {
        res.status(400)
        res.send(err);
    })
})

app.post('/users',(req,res) => {
    console.log('request body: ',req.body);
    
    let newUser = new User({
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
    });

    newUser.save().then(doc => {
        res.status(200).send(doc);
    }, err => {
        res.status(400)
        res.send(err);
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

module.exports = {app};

//create an Instance of Model
// let newTodo = new Todo({
//     text:'',
//     completed:false,
//     completedAt:17009802
// });


/*
    call save on newTodo
    save the instance to Mongodb.TodoApp.Todo
    return Promise
*/
// newTodo.save().then(doc => {
//     console.log('Saved todo', doc);
// }, (err) => {
//     console.log('Unable to save todo', err);
// });   



// let user = new User({
//     email: 'key@email.com',
//     name:'Tony',
//     age:29,
//     location:'NY'
// });


// user.save().then(doc => {
//     console.log('Saved User', doc);
// }, err => {
//     console.log('Unable to save user',err)
// })
