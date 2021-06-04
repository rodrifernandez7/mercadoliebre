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
        
        User.create(req.body);
        return res.send('Se guardó el producto.');
    }
};

module.exports = usersController;