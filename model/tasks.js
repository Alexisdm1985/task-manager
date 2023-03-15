const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    }, 
    completed: {
        type: Boolean,
        default: false
    }
});

// const Task = mongoose.model('Task', taskSchema); do this or:
module.exports = mongoose.model('Task', taskSchema);