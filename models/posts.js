const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Posts', postSchema);