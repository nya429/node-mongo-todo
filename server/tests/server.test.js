/*jslint esversion:6 */
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//dummy todo data
const todos = [ {text:"todo test 1"},
                {text:"todo test 2"},
                {text:"todo test 3"},
                {text:"todo test 4"},
                {text:"todo test 5"}]


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
                expect(todos.length).toBe(6);
                expect(todos[5].text).toBe(text);
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
                expect(todos.length).toBe(5);
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
            expect(res.body.length).toBe(5);
        })
        .end(done);
    });

});