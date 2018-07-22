const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    abstract: {
        type: String,
        maxLength: 200,
        trim: true,
        default: ''
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Posts', postSchema);