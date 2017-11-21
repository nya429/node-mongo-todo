/*jslint esversion:6 */
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


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


let data = {
    id: 100
};
let secret = '123456';


let token = jwt.sign(data,secret); 
console.log('token: ', token);

let decoded = jwt.verify(token,secret);
console.log('decoded: ',decoded);