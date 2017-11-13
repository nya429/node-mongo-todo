/* jslint esversion:6*/
const mongoose = require('mongoose');

//define the User model
const User = mongoose.model('user', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    },
    age: {
        type: Number,
        default:null
    },
    location: {
        type: String,
        trim: true,
        default:null
    }
});

module.exports = {User};