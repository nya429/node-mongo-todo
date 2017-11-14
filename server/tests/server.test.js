/*jslint esversion:6 */
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//dummy todo data
const todos = [ {
                _id: new ObjectID(), 
                'text':"todo test first"
            },{
                _id: new ObjectID(),
                'text':"todo test second"
            }
]


beforeEach((done) => {            //run some code before each descript script
    Todo.remove({})              //remove({})  wipe all todos;
      .then(() => {
        Todo.insertMany(todos);
    }).then(() => done())                 
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err)
                return done(err);
            
            //MongoDb test
            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);
                expect(todos[2].text).toBe(text);
                done();
            }).catch(err => done(err));    //statement Syntax
        });
    });

    it('should create a Todo with invalid Todo', (done) => {
        request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end((err, res) => {
            if(err)
                return done(err);
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).
            catch(e => done(e));
        })
    })
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
          .get('/todos')
          .expect(200)
          .expect(res => {
            expect(res.body.length).toBe(2);
        })
        .end(done);
    });

});

describe('GET /todos/:id', () => {
    
    let id = todos[0]._id.toHexString();    //convert ObjectId into String 
    console.log(id);
    it('should return todo doc', (done) => {
        request(app)
          .get(`/todos/${id}`)
          .expect(200)
          .expect(res => {
              expect(res.body.todo.text).toBe(todos[0].text);
          })
          .end(done);
      });

      it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
    
        request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done);
      });

      it('should return 404 for non-object ids', (done) => {
        request(app)
          .get('/todos/123abc')
          .expect(404)
          .end(done);
      });

});