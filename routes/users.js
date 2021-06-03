const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
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

const validations = [
    body('name').notEmpty().withMessage('Debes escribir un nombre'),
    body('userName').notEmpty().withMessage('Debes escribir un nombre de usuario'),
    body('email').notEmpty().withMessage('Debes escribir un correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('dateOfBirth').notEmpty().withMessage('Debes colocar tu fecha de nacimiento'),
    body('adress').notEmpty().withMessage('Debes completar tu dirección'),
    body('password').notEmpty().withMessage('Debes escribir una contraseña'),
    body('confirmPassword').notEmpty().withMessage('Debes confirmar la contraseña'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]

router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), validations, usersController.processRegister);

/* perfil del usuario */
router.get ('/profile/:userId', usersController.profile);

module.exports = router;