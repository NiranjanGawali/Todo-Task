'use strict';

require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
	PORT : process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}