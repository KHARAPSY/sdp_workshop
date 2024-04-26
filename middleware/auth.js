'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied!: No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // console.log('Decoded token:', decoded); 
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error); 
        res.status(400).send('Invalid token');
    }
}