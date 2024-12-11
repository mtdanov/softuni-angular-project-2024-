const Post = require('../model/Post')
const User = require('../model/User')


exports.getById = (postId) => Post.findById(postId)

exports.getLatest = () => Post.find().sort({ createdAt: -1 }).limit(7)




exports.del = async (postId, userId) => {
    await Post.findByIdAndDelete(postId)
    await User.findByIdAndUpdate(userId, { $pull: { createdPost: postId } })
}
exports.getAll = async () => {
    const posts = await Post.find().populate('owner', 'firstName lastName profilePic createdPost').limit(3)

    return posts
}

exports.getMore = async (num) => {

    const posts = await Post.find().populate('owner', 'firstName lastName profilePic createdPost').skip((num - 1) * 3)
        .limit(3);
    // const totalPosts = await Post.countDocuments();

    return posts
}

exports.create = async (description, imageUrl, userId) => {

    const post = await (await Post.create({ description, ['postPic']: imageUrl, ['owner']: userId })).populate('owner', 'firstName lastName profilePic createdPost')
    await User.findByIdAndUpdate(userId, { $push: { createdPost: post._id } })

    return post

}


exports.getByIdEdit = async (productId) => {
    const post = await Post.findById(productId)
    const { name, description, age, breed, file } = post
    return { name, description, age, breed, file }
}

exports.editPost = async (postId, description, postPic) => {
    const result = await Post.findByIdAndUpdate(postId, { description, postPic }, { new: true }).populate('owner', 'firstName lastName profilePic createdPost')
    return result
}

// exports.like = (postId, userId) => Post.findByIdAndUpdate(postId, { $push: { likes: userId } })

// const likes = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true }).select('likes')

// console.log(likes);

// const likesLength = likes.likes.length
// const id = likes._id

// return { likesLength, id }



exports.like = async (postId, userId) => {
    // console.log("Received postId:", postId);
    // console.log("Received userId:", userId);

    const post = await Post.findById(postId);
    if (post) {

    }
    const mongoose = require('mongoose');

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId format');
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        );
        if (!updatedPost) {
            throw new Error("Post not found");
        }
        return updatedPost;
    } catch (error) {
        console.error("Error updating likes:", error);
        throw error;
    }
};



exports.unlike = async (postId, userId) => {
    const likes = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true }).select('likes')

    const likesLength = likes.likes.length
    const id = likes._id


    return { likesLength, id }
}