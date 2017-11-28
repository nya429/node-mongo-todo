/*jslint esversion:6*/
require('./config/config');
const _ = require('lodash');
const express= require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
//Heroku process.argv
const port = process.env.PORT; //|| 3000;

app.use(bodyParser.json());

/*-----------------------------------------------*/

/**
 * GET /todos
 *
/*-----------------------------------------------*/
app.get('/todos', (req,res) => {
    let filter;

    Todo.find().then(todos => {
        res.status(200).send(todos);
    }, err => {
        res.status(400).send(err);
    });
})


/**
 * GET /todos/:id
 *
/*-----------------------------------------------*/
app.get('/todos/:id', (req,res) => {
    //res.status(200).send(req.params);  //test how req.params work
    let id = req.params.id;

    //invalidId
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findById(id).then(todo => {
        if(!todo)
            return res.status(404).send();
        else
            return res.status(200).send({todo});
    }).catch(err => {
            res.status(400).send();                        //not sending cuz the err message may contain private info

    });
});

/**
 *  POST /todos
 *
/*-----------------------------------------------*/
app.post('/todos',(req,res) => {

    let newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then(doc => {
        res.status(200).send(doc);
    }, err => {
        res.status(400).send(err);
    });
})



/**
 * PATCH /todos/:id
 *
/*-----------------------------------------------*/
app.patch('/todos/:id', (req,res) => {
    let id = req.params.id;

    //pull the argument from the body assign to the body
    //update the content only appeared in model
    let body = _.pick(req.body,['text','completed']);
   
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //timestamp
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    //new = returnOriginla
    Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then(todo => {
        if(!todo) {
            return res.status(404).send()
        }

        res.status(200).send({todo});
    }).catch(e => {
        res.status(404).send();
    });
});


/**
 * DELETE /todos/:id
 *
/*-----------------------------------------------*/
app.delete('/todos/:id', (req,res) => {
    let id = req.params.id;
 
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then(todo => {
        if(!todo)
            return res.status(404).send();

        res.status(200).send({todo:todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

/**
 *  POST /users
 *  create a new user
/*-----------------------------------------------*/
app.post('/users', (req, res) => {

    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken(); 
    }).then(token => {
        res.header('x-auth', token).send(user);
    }).catch(e => {
        res.status(400).send(e);
    });  
});

/**
 *  GET /users/me
 *  authenticate auth token
/*-----------------------------------------------*/
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

/**
 *  POST /users/login {email, password}
 *  authenticate login
/*-----------------------------------------------*/
app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email','password']);

    User.findByCredentials(body.email, body.password).then(user => {
        user.generateAuthToken().then(token => {
            res.header('x-auth',token).send(user);
        });
    }).catch(e => {
        res.status(400).send();
    })
    
});

/*-----------------------------------------------*/
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};

//create an Instance of Model
// let newTodo = new Todo({
//     text:'',
//     completed:false,
//     completedAt:17009802
// });


/*
 *   call save on newTodo
 *  save the instance to Mongodb.TodoApp.Todo
 * return Promise
*/
// newTodo.save().then(doc => {
//     console.log('Saved todo', doc);
// }, (err) => {
//     console.log('Unable to save todo', err);
// });   



// let user = new User({
//     email: 'key@email.com',
//     name:'Octo',
//     age:29,
//     location:'NY'
// });


// user.save().then(doc => {
//     console.log('Saved User', doc);
// }, err => {
//     console.log('Unable to save user',err)
// })
