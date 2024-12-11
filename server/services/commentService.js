const Comment = require('../model/Comment')
const Post = require('../model/Post')

exports.create = async (comment, userId, username, postId, parentId) => {
    // console.log(comment, userId, username, postId, parentId);

    const result = await Comment.create({ comment, username, userId, parentId })

    if (parentId !== null) {
        await Comment.findByIdAndUpdate(parentId, { $push: { replies: result._id } })
    }

    await Post.findByIdAndUpdate(postId, { $push: { comments: result._id } })

    return result


}

exports.getComments = async (postId) => {
    const comments = await Post.findById(postId).populate('comments').select('comments')
    const justComments = comments.comments.filter((comment) => comment.parentId === null)
    return justComments
}

exports.getReplies = async (id) => {
    const replies = await Comment.findById(id).populate('replies').select('replies')
    const justReplies = replies.replies
    return justReplies
}
exports.del = async (commentId, postId) => {
    await Comment.findByIdAndDelete(commentId)
    await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: commentId } },
        { new: true }
    );
}


exports.delReplie = async (parentId, commentId, postId) => {
    await Comment.findByIdAndUpdate(parentId, { $pull: { replies: commentId } },
        { new: true })
    await Comment.findByIdAndDelete(commentId)
    await Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: commentId } },
        { new: true }
    );
}


exports.editComment = (id, comment) => Comment.findByIdAndUpdate(id, { comment }, { new: true })

exports.getComment = async (commentId) => Comment.findById(commentId)

