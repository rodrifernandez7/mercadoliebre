const path = require('path');
const { body } = require('express-validator');


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

module.exports = validations;