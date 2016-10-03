// Set up the dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Student Schema
var studentSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    safe: {
        type: Boolean,
        default: false
    },
    absent: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Create a model to use the Schema
var Students = mongoose.model('Student', studentSchema);

// Make this available to the Node application
module.exports = Students;
