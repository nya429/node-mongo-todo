/*jslint esversion:6*/
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDb',err);
    }

    console.log('server.connected');

    //delete Many
    db.collection('User')
    .deleteMany({
        name:'Joun'
    }).then((err,result) => {
        if(err) {
            return console.log('unable to delete the document', err);
        }

        console.log(JSON.stringify(result, undefined, 2));
    })
    //delete One, once it excueted that meeet the criteria
    db.collection('User')
    .deleteOne({
        name:'Jotun'
    }).then((err,result) => {
        if(err) {
            return console.log('unable to delete the document', err);
        }

        console.log(JSON.stringify(result, undefined, 2));
    })

    //findOne and delete
    db.collection('User')
    .findOneAndDelete({
        _id:new ObjectID('5a04fdedbc9bd31188dadf0d')
    }).then((err,result) => {
        if(err) {
            return console.log('unable to delete the document', err);
        }

        console.log(JSON.stringify(result, undefined, 2));
    })
    //close connection
    db.close();
})