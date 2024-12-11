const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        // name: {
        //     type: String,
        //     required: true
        // },
        // profilePic: {
        //     type: String,
        //     required: true
        // },
        description: {
            type: String,
            required: true
        },
        postPic: {
            type: String,
            required: true
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [{
            type: mongoose.Types.ObjectId,
            ref: 'Comment',
        }
        ]
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post