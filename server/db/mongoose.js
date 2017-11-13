/*jslint esversion:6*/
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;                     //use global promise in Mongoose                      
mongoose.connect('mongodb://localhost:27017/TodoApp'); //Protocol://ip:port/dbName      

module.exports = {mongoose};