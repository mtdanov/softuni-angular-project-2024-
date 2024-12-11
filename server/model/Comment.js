const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String, require: true
    },
    username: {
        type: String, require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    parentId: {
        type: mongoose.Schema.Types.ObjectId, // Поправено
        ref: 'Comment', // Референция към същата колекция за родителски коментар
        default: null // По подразбиране е null за основни коментари
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' // Референция към същата колекция за отговори
        }
    ],
    showReplies: [],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment

// email: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
// },