'use strict';

const mongoose = require("mongoose");
const winston = require("winston");

require('dotenv').config();

module.exports = () => {
    const MONGODB_URI = process.env.MONGODB_URI; 
    mongoose.connect(MONGODB_URI)
    .then(() => winston.info('MongoDB Connected...'));
}