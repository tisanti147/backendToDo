const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
  });

  module.exports = mongoose.model('task', taskSchema)