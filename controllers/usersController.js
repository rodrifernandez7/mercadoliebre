const bcryptjs = require('bcryptjs');
const path = require('path');
const { validationResult } = require('express-validator')

const User = require('../models/User.js');

const usersController = {

    login: function(req , res){
        res.render('login');
    },

    register: function (req , res){
        res.render('register');
    },

    profile: function (req , res){
        res.send('aca iría la vista del perfil del usuario');
    },

    processRegister: function (req , res){

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){ /* porque es un array, entonces estamos diciendo que si es > 0 , hay errores */
            return res.render('register', {
                errors: resultValidation.mapped(),  /* convierte el array en objeto literal */
                oldData: req.body
            }); 
        }

        let userInDB = User.findByField('email', req.body.email);   /* para que me encuentre en findByField (creado en el model), 
                                                                    si el usuario ya existe por su email */
        if(userInDB) {
            return res.render('register', {                         /* si el usuario a crear coincide con userInDB, tiro el mensaje de error */
                errors: {
                    email: {
                        msg: 'Este correo ya está registrado'
                    }
                },
                oldData: req.body  /* para que me siga manteniendo la información que completé */
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            confirmPassword: bcryptjs.hashSync(req.body.confirmPassword, 10),
            avatar: req.file.originalname
        }
        
        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    },

    loginProcess: function (req , res){

        let userToLogin = User.findByField('userName', req.body.userName);   /* lo mismo que hice anteriormente para chequear si el email ya estaba regristrado */
                                                                                
        if(userToLogin) {
            let passwordOkay = bcryptjs.compareSync(req.body.password, userToLogin.password); /* primer parámetro texto plano que viene del req. 2do parametro es lo hasheado anteriormente y guardado en la base de datos */
            if (passwordOkay) {
                return res.send('Puedes ingresar.')
            }
            return res.render ('login', {
                errors: {
                    userName: {
                        msg: 'Las credenciales son invalidas.'
                    }
                }
            })   
        }
        return res.render('login', {      /* si en este caso el nombre de usuario no está registrado hace esto: */
            errors: {
                userName: {
                    msg: 'El nombre de usuario no se encuentra en la base de datos.'
                }
            }
        })

        return res.send(userToLogin);
    }
};

module.exports = usersController;