const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        ownerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message