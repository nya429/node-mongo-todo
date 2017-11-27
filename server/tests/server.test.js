/*jslint esversion:6 */
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seeds');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
        let hexId = new ObjectID().toHexString();
    
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


describe('DELETE /todos/:id', () => {
   it('should remove a todo', done => {
       
        let hexId = todos[0]._id.toHexString();
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect(res => {
              expect(res.body.todo._id).toBe(hexId);
          })
          .end((err,res) => {
              if(err) {
                  return done(err);
                }

            Todo.findById(hexId)
              .then(todo => {
                  expect(todo).toBeNull();
                  done();
              }).catch(e => done(e));
        });
    });
   
   it('should return 404 if id not found', done => {
        let hexId = new ObjectID().toHexString();
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(404)
          .end(done);
   });

   it('should return 404 if id is invalid', done => {
    request(app)
      .delete(`/todos/13456789`)
      .expect(404)
      .end(done);
    });
   
});

describe('PATCH /todos/:id', () => {

    it('should patch a todo', (done) => {
        let hexId = todos[0]._id.toHexString();
        let text = 'patch Test Post';
        request(app)
         .patch(`/todos/${hexId}`)
         .send({
             'text': text,
             'completed': true,
            })
         .expect(200)
         .expect((res) => {
             //console.log(res.body.todo)
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.text).toBe(text);
            expect(typeof(res.body.todo.completedAt)).toBe('number');
         })
         .end((err, res) => {
            if(err) {
                return done(err);
              }

            Todo.findById(hexId)
              .then(todo => {
                expect(todo.text).toBe(text);
                done();
            }).catch(e => done(e));
         });
    });

    it('should clear completeAt when completed is false', (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = 'patch Test Post2';

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            'text':text,
            'completed':false
        })
        .expect(200)
        .expect(res => {
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completedAt).toBeNull();
        })
        .end(done);
    });
    
});