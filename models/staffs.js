// Set up the dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var staffSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Create a model to use the Schema
var Staffs = mongoose.model('Staff', staffSchema);

// Make this available to the Node application
module.exports = Staffs;
