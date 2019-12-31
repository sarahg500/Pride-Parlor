const mongoose = require('mongoose');
const validator = require('validator');


const concernSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    issue: {
        type: String,
        required: true,
        trim: true,
    }
});


const Concern = mongoose.model('Concern', concernSchema);

module.exports = Concern;


