const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
    },
    about: {
        type: String,
        default: "No info added"
    },
    studies: {
        type: String,
        default: "No info added"
    },
    services: {
        type: String,
        default: "No info added"
    },
    location: {
        type: String,
        default: "No info added"
    },
    price: {
        type: String,
        default: "No info added"
    },
    banner: {
        type: String,
        default: 'https://res.cloudinary.com/dxhzamiea/image/upload/v1733902826/mzsadkfugscipgedo43y.webp'
    },
    profilePic: {
        type: String,
        default: 'https://res.cloudinary.com/dxhzamiea/image/upload/v1733735296/yiinrw54aml8nviqoc6n.jpg'
    },
    createdPost: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    postLiked: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Post",
        },
    ],
    workTime: {
        monday: { type: String, },
        tuesday: { type: String },
        wednesday: { type: String },
        thursday: { type: String },
        friday: { type: String },
        saturday: { type: String },
        sunday: { type: String },
    },
})

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Passwords don\'t match!');
        }
    });

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});
const User = mongoose.model('User', userSchema)
module.exports = User