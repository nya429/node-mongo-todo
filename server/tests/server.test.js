/*jslint esversion:6 */
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {            //run some code before each script
    Todo.remove({})              //remove({})  wipe all todos;
    .then(() => done());                 
});

describe('POST ./todos', () => {
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
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
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
                expect(todos.length).toBe(0);
                done();
            }).
            catch(e => done(e));
        })
    })
});