/*jslint esversion:6 */
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc';


/**
 *  arg1 -> number of rounds to generate the salt (conventionally 120)
 *  arg2 -> callback 
 */
// bcrypt.genSalt(10,(err,salt) => {
//     bcrypt.hash(password,salt,(err,hash) => {
//         console.log(hash);
//     });
// });

let hashedPassword = '$2a$10$dfAMFLQrkP/LzaP4KdTJoOyIoT0rD4bgaR3lqW2lXU.CPfU7ZVBPG';

bcrypt.compare(password, hashedPassword, (err,res) => {
    console.log(res);
});

//
/**
 * jsonWebToken logic 
let message = 'I am passWord ';
let hash = SHA256(message).toString();

console.log(`message: ${message}`);
console.log(`hash: ${hash}`);

let data = {
    id: 100000198
};
let salt = 'someSalt';


let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'salt').toString()
}

//verify
let resultHash = SHA256(JSON.stringify(token.data = 1) + 'salt').toString();


if (resultHash === token.hash) {
    console.log('Data are match');
} else {
    console.log('Data are not match');
}
*/

/**jwt logic 
let data = {
    id: 100
};
let secret = '123456';


let token = jwt.sign(data,secret); 
console.log('token: ', token);

let decoded = jwt.verify(token,secret);
console.log('decoded: ',decoded);

*/