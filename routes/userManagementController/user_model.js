'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false },
}, { timestamps: true }, { read: 'secondaryPreferred' });


var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};
