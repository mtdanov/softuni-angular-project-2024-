const router = require('express').Router()
const { isGuest } = require('../middlewares/authMiddleware')
const postService = require('../services/postService')
const cloudinary = require('../config/couldinaryConfig')
const { upload } = require('../config/multer.Config')
const { parseError } = require('../utils/errorUtil')



router.post('/:userId/create-post', upload.single('file'), async (req, res) => {
    const { description } = req.body;
    const { userId } = req.params

    try {
        let imageUrl = ''
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const createdPost = await postService.create(description, imageUrl, userId)
        res.status(200).json(createdPost)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})

router.put('/:postId/edit-post', upload.single('file'), async (req, res) => {

    try {
        const { description } = req.body;
        // console.log(description);
        const { postId } = req.params
        // console.log(postId);
        let imageUrl = '';
        if (req.body.fileUrl) {
            imageUrl = req.body.fileUrl
        } else if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const result = await postService.editPost(postId, description, imageUrl)
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/get-posts', async (req, res) => {

    try {
        const posts = await postService.getAll()
        res.json(posts)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getMore-posts', async (req, res) => {
    const { num } = req.query
    try {
        const posts = await postService.getMore(num)

        res.json(posts)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})




router.patch('/like', async (req, res) => {
    const { postId } = req.body
    const { userId } = req.body
    try {
        await postService.like(postId, userId)
        res.status(200).json({ text: 'Success' })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
// const likes = await postService.like(postId, userId)


router.patch('/unlike', async (req, res) => {
    const { userId, postId } = req.body
    try {
        const likes = await postService.unlike(postId, userId)
        res.status(200).json(likes)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/:postId/delete', async (req, res) => {
    const { postId } = req.params
    const { userId } = req.query
    try {
        await postService.del(postId, userId)
        res.status(200).json('DELETED')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/animal/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await postService.getById(id)
        res.json(post)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/animalEdit/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await postService.getByIdEdit(id)
        res.json(post)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/deletePost', async (req, res) => {
    const id = req.body.id
    try {
        await postService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


module.exports = router