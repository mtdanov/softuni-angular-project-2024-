const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const commentService = require('../services/commentService')
const { parseError } = require('../utils/errorUtil')


router.post('/create', async (req, res) => {

    try {
        const { comment, userId, username, postId, parentId } = req.body
        const result = await commentService.create(comment, userId, username, postId, parentId)
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


router.get('/:parentId/replies', async (req, res) => {
    const { parentId } = req.params
    try {
        const replies = await commentService.getReplies(parentId)

        res.json(replies)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getComments/:postId', async (req, res) => {
    try {
        const { postId } = req.params

        const comments = await commentService.getComments(postId)

        res.json(comments)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/:postId/:commentId/delete', async (req, res) => {

    try {
        const { postId } = req.params
        const { commentId } = req.params
        await commentService.del(commentId, postId)
        res.json('DELETED')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})


router.delete('/:postId/:parentId/:commentId/delete', async (req, res) => {

    try {
        const { postId } = req.params
        const { commentId } = req.params
        const { parentId } = req.params

        await commentService.delReplie(parentId, commentId, postId)
        res.json('DELETED')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})

router.get('/:commentId/getComment', async (req, res) => {
    const { commentId } = req.params
    try {
        const comment = await commentService.getComment(commentId)

        res.json(comment)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.patch('/:commentId/edit', async (req, res) => {
    const { commentId } = req.params
    const { text } = req.body
    try {
        const editedComment = await commentService.editComment(commentId, text)
        res.json(editedComment)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
module.exports = router