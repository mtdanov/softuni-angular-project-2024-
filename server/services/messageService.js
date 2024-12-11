const Message = require('../model/Message')

exports.create = async (recipient, subject, message, ownerId) => {
    await Message.create({ recipient, subject, message, ownerId })
}

exports.del = (id) => Message.findByIdAndDelete(id)

exports.getById = async (userId) => {
    const messages = await Message.find({ recipient: userId })
        .populate('ownerId', 'firstName lastName profilePic')
        .populate('recipient', 'username');
    return messages;
}


exports.getSendMessages = async (ownerId) => {
    const messages = await Message.find({ ownerId })
        .populate('ownerId',)
        .populate('recipient', 'firstName lastName profilePic');
    return messages;
}


