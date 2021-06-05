const express = require('express');
const router = express.Router();
const path = require('path');

/* Controller */
const usersController = require ('../controllers/usersController.js');

/* Middlewares */
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

/* Formulario de login */
router.get('/login', guestMiddleware,  usersController.login);

/* Procesar el login */
router.post('/login', usersController.loginProcess);

/* Formulario de registro */
router.get('/register', guestMiddleware, usersController.register);

/* Procesar el registro */
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

/* perfil del usuario */
router.get ('/profile/', authMiddleware, usersController.profile);

/* Logout */
router.get ('/logout', usersController.logout);


module.exports = router;