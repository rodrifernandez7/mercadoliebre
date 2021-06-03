const path = require('path');
const { validationResult } = require('express-validator')

const usersController = {
    login: function(req , res){
        /* let htmlPath = path.join(__dirname,'../views/login.html' );
        res.sendFile(htmlPath); */
        res.render('login');
    },
    register: function (req , res){
        /* let htmlPath = path.join(__dirname,'../views/register.html' );
        res.sendFile(htmlPath); */
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

        return res.send('Ok, las validaciones se pasaron y no tienes errores')

        /* return res.send(resultValidation); */
        /* return res.send({
            body: req.body,
            file: req.file
        }); */
    }
};

module.exports = usersController;