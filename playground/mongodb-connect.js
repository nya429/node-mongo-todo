/*jslint esversion:6 */

const {MongoClient, ObjectID} = require('mongodb');
/*
    using Destruction Assignment,
     same as
    const MongoClient =require('mongodb').MongoClient;
*/
let objId = new ObjectID();
console.log(objId);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connec to mongo',err);
    } 

    console.log('Connected to the MongoDB server');
    /* insert example  
    // db.collection('Todos')
    // .insertOne({
    //     text:'done Something',
    //     completed: true
    // },(err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo',err)
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })

    // db.collection('User')
    // .insertOne({
    //     _id:123,
    //     name: 'Joun',
    //     age: 26,
    //     location: 'Jotunheim'
    // },(err,result) => {
    //     if(err) {
    //         return console.log('Unable to insert User', err);
    //     }
    
    //     console.log(JSON.stringify(result.ops,undefined,2));
    //     //console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // })
    */


    //find with toArray cursor
    // db.collection('Todos')
    // .find({
    //     _id:new ObjectID('5a04fb92e1c96a0c1810facb')
    // })
    // .toArray()
    // .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, err => {
    //     console.log('unable to fetch the data',err);
    // });


    db.collection('Todos')
    .find().count().then((count) => {
        console.log('Todos counts:',count);
    }, err => {
        console.log('unable to fetch the data',err);
    });
    db.close();    
});