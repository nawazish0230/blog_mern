const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comments: [
        {
            postedBy: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
}, {timestamps: true})

module.exports = mongoose.model('post', postSchema);