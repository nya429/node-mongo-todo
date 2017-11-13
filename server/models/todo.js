/* jslint esversion:6*/
const mongoose = require('mongoose');

//Define the Todo model
const Todo = mongoose.model('todo', {
    text: {
        type: String,
        required: true,
        minglength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    // timeStamp
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};