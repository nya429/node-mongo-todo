/*jslint esversion:6 */
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err) {
        console.lot('Unable connect to Mongodb',err);
    }
    console.log('Connected to the Mongodb');
    db.collection('User')
    .findOneAndUpdate({_id:new ObjectID("5a07974742094ca1546a2bc2")},{
        $set: {
            name:"Song"
        },$inc:{
            age:7
        }
    },{
        returnOriginal: false
    },(err, result) => {
        if(err) {
            console.lot('Unable connect to Mongodb',err);
        }
        console.log(result);
    })

    db.close();

})