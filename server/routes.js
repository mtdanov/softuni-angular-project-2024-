const router = require('express').Router();

const userContoller = require('./controllers/userController')
const messageController = require('./controllers/messageController')
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')

router.use('/user', userContoller);
router.use('/post', postController)
router.use('/message', messageController)
router.use('/comments', commentController)

module.exports = router