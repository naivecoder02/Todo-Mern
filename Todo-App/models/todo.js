const mongoose = require('mongoose');

const todoschema = new mongoose.Schema({
    id:String,
    todoText:String,
    priority:String,
    filename:String
});

const Todo = mongoose.model('Todo',todoschema);

module.exports = Todo;