/* jslint esversion:6*/
const mongoose = require('mongoose');
const validator = require('validator');  
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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

UserSchema.methods.removeToken = function (token) {
    let user = this;
    return user.update({
        //mongodb native operator
        $pull: {
            tokens: {token} 
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded; 
    
    try{
        decoded = jwt.verify(token, secret);
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // }); 
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        //query a nested variable, required to wrap with ''
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};


UserSchema.statics.findByCredentials = function (email,password) {
    let User = this;
    let decoded; 
    
    return User.findOne({email}).then(user => {
        if(!user) {
            return Promise.reject();
        }

        return new Promise ((resolve, reject) => {
            //bcrypt only return callback
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    return resolve(user);
                } else {
                    eject();
                }
            });
        });
    });
};

/**
 * There are two types of pre hooks, serial and parallel.
 * arg2 -> default false, ignorable
 * `true` means this is a parallel middleware. You **must** specify `true`
 */
UserSchema.pre('save', function(next) {
    let user = this;
    //only hash the password when modified
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = {User};