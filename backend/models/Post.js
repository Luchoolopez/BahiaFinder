const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        maxLength: 50
    },
    images: {
        type:[String],
        default: []
    },
    status: {
        type: String,
        enum: ['perdido', 'encontrado'],
        default: 'perdido'
    }
});

postSchema.index({ title: 'text', description: 'text', tags: 'text'});

module.exports = mongoose.model('Post', postSchema);