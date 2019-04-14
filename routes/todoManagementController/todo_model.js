'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var todoSchmea = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true }, { read: 'secondaryPreferred' });


var TodoModel = mongoose.model('Todo', todoSchmea);

module.exports = {
    TodoModel: TodoModel
};
