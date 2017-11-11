/*jslint esversion:6 */

const {MongoClient, ObjectID} = require('mongodb');
/*
    using Destruction Assignment,
     same as
    const MongoClient =require('mongodb').MongoClient;
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connec to mongo',err);
    } 
    
    db.collection('Todos')
    .find().toArray().then((docs) => {
        let results = JSON.stringify(docs,undefined,2);
        console.log('toaods',results)
    },err => console.log('unable to fetch the data',err));

    console.log('Connected to the MongoDB server');
 
    db.close();    
});