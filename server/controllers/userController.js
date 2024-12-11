const router = require('express').Router()
const userService = require('../services/userService')
const { parseError } = require('../utils/errorUtil')
const cloudinary = require('../config/couldinaryConfig')
const { upload } = require('../config/multer.Config')



router.put('/profile/:userId/update-about', async (req, res) => {
    const { info } = req.body
    const { field } = req.body
    const { userId } = req.params
    try {
        const result = await userService.editAbout(userId, field, info)

        res.status(200).json({ field: result[field] })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/profile/:userId/about', async (req, res) => {
    const { userId } = req.params
    try {
        const result = await userService.getAbout(userId)
        const data = {
            about: result.about,
            studies: result.studies,
            services: result.services,
            location: result.location,
            price: result.price,
            name: `${result.firstName} ${result.lastName}`
        }
        res.status(200).json(data)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})

router.patch('/profile/:userId/banner', upload.single('file'), async (req, res) => {
    const { userId } = req.params
    const { type } = req.body

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            let imageUrl = result.secure_url;
            const banner = await userService.postBanner(userId, imageUrl, type);
            res.status(200).json(banner)
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})





router.patch('/profile/:userId/profilePic', upload.single('file'), async (req, res) => {
    const { userId } = req.params
    const { type } = req.body

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            let imageUrl = result.secure_url;
            const banner = await userService.postProfilePic(userId, imageUrl, type);
            res.status(200).json(banner)
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


router.get('/profile/:userId/banner', async (req, res) => {
    const { userId } = req.params
    try {
        const result = await userService.getBanner(userId)
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


router.get('/profile/:userId/pic', async (req, res) => {
    const { userId } = req.params
    try {
        const result = await userService.getPic(userId)
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})



router.get('/profile/:userId/profilePic', async (req, res) => {
    const { userId } = req.params
    try {
        const result = await userService.getPic(userId)
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


router.post("/register", async (req, res) => {

    const { firstName, lastName, email, password, repeatPassword, city, userType } = req.body;
    try {
        const result = await userService.register(firstName, lastName, email, password, repeatPassword, city, userType);
        res.status(200).json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await userService.login(email, password);
        res.cookie('auth', result.accessToken, { httpOnly: true });
        res.status(200).json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});
router.post("/logout", (req, res) => {
    try {
        res.clearCookie('auth');
        // console.log(res.cookie)
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

});




router.get('/:userId/get-working-time', async (req, res) => {
    const { userId } = req.params
    try {
        const result = await userService.getWorkingtime(userId)

        res.status(200).json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.patch('/:userId/working-time', async (req, res) => {
    const { userId } = req.params
    const { day, time } = req.body
    try {
        const result = await userService.updateWorkingTime(day, time, userId)
        res.status(200).json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/search', async (req, res) => {
    try {
        const { searchField, professional, location } = req.query;
        const result = await userService.search(searchField, professional, location);
        res.status(200).json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await userService.getUser(id)
        res.json(user)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})




router.put('/profile/edit', async (req, res) => {
    try {
        const id = req.body.id;
        const data = req.body.data
        const user = await userService.editUser(id, data)
        res.status(200).json(user)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})


module.exports = router