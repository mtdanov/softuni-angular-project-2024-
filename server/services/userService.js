const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateToken = require('../utils/tkn')

exports.register = async (firstName, lastName, email, password, repeatPassword, city, userType) => {

    const user = await User.create({ firstName, lastName, email, password, repeatPassword, city, userType });

    const token = await generateToken(user)

    return { accessToken: token, email: user.email, id: user._id, name: user.firstName };
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    const token = await generateToken(user)
    // res.cookie('auth', token, { httpOnly: true })
    // const isProfileComplete = !!(user.about && user.studies && user.services && user.location && user.banner && user.profilePic);

    return { accessToken: token, id: user._id, email: user.email, name: `${user.firstName} ${user.lastName}`, userType: user.userType }
};

exports.getUser = (userId) => User.findById(userId)

exports.editUser = async (id, data) => {
    const result = await User.findByIdAndUpdate(id, data, { new: true })
    return result
}
exports.getOrders = (userId) => User.findById(userId).populate('orders')


// new 
exports.editAbout = async (userId, field, info) => {
    const result = User.findByIdAndUpdate(userId, { [field]: info }, { new: true })

    return result
}
exports.getAbout = async (userId) => {
    const user = User.findById(userId)
    
    return user
}

exports.postBanner = async (userId, imageUrl, type) => {
    const result = await User.findByIdAndUpdate(userId, { [type]: imageUrl }, { new: true })
    let newImage = result[type]
    return newImage
}

exports.postProfilePic = async (userId, imageUrl, type) => {
    const result = await User.findByIdAndUpdate(userId, { [type]: imageUrl }, { new: true })
    let newImage = result[type]
    return newImage
}
exports.getBanner = async (userId) => {
    const result = await User.findById(userId).select('banner')
    const { banner } = result
    return banner
}




exports.getPic = async (userId) => {
    const result = await User.findById(userId).select('profilePic')
    const { profilePic } = result
    return profilePic
}
exports.getAllUsers = async () => {
    const result = await User.find().select('firstName lastName city profilePic createdAt')
        .limit(1);
    const totalUsers = await User.countDocuments();

    return { result, totalUsers }

}



exports.getMoreUsers = async (page, limit) => {
    const result = await User.find().select('firstName lastName city profilePic createdAt').skip((page - 1) * limit)
        .limit(limit);
    const totalUsers = await User.countDocuments();

    return { result, totalUsers }

}

exports.search = async (searchField, professional, location) => {
    let query = {};

    if (searchField) {
        query.firstName = searchField
    };
    if (professional) {
        query.userType = new RegExp(professional, 'i');
    };
    if (location) {
        query.city = new RegExp(location, 'i');
    };

    let result = await User.find(query).select('firstName lastName professional city profilePic userType')

    result = result.filter((user) => user.userType);
    return result
}

exports.updateWorkingTime = async (day, time, userId) => {
    const result = await User.findByIdAndUpdate(userId, { [`workTime.${day}`]: time }, { new: true }).select(`workTime.${day}`)
    const updatedDay = result.workTime
    return updatedDay
}

exports.getWorkingtime = async (userId) => {
    const result = await User.findById(userId).select('workTime')
    return result.workTime
}