const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const messageService = require('../services/messageService')
const { parseError } = require('../utils/errorUtil')

router.post('/createMessage', async (req, res) => {
    const { recipient, subject, message, ownerId } = req.body
    try {
        const comment = await messageService.create(recipient, subject, message, ownerId)
        res.status(200).json('CREATED!')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getSendMessages/:ownerId', async (req, res) => {
    const { ownerId } = req.params
    try {
        const msg = await messageService.getSendMessages(ownerId)
        res.json(msg)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


router.get('/getMessages/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const msg = await messageService.getById(userId)
        res.json(msg)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/deleteMessage/:id', async (req, res) => {
    const id = req.params.id
    try {
        await messageService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
module.exports = router