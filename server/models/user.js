/* jslint esversion:6*/
const mongoose = require('mongoose');
const validator = require('validator');  
const jwt = require('jsonwebtoken');
const _ = require('lodash');
//define the User model

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        unique:true,
        validate: {
            // validator: value => {
            //     return validator.isEmail(value);
            // },
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }],
    name: {
        type: String,
        require: false,
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



let secret = '123abc';
// limit the data sending back, leave off the password and toekn
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, secret);

    user.tokens.push({access,token});
    
    return user.save().then(() => {
        return token;
    });
};

const User = mongoose.model('user', UserSchema);

module.exports = {User};