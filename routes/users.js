const express = require('express');
const router = express.Router();
const path = require('path');

/* Controller */
const usersController = require ('../controllers/usersController.js');

/* Middlewares */
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');

/* Formulario de login */
router.get('/login', usersController.login);

/* Formulario de registro */
router.get('/register', usersController.register);

/* Procesar el registro */
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

/* perfil del usuario */
router.get ('/profile/:userId', usersController.profile);

module.exports = router;