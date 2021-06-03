const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usersController = require ('../controllers/usersController.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/img/avatars'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFileName = 'avatar-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer ({storage});

router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), usersController.processRegister);

/* perfil del usuario */
router.get ('/profile/:userId', usersController.profile);

module.exports = router;