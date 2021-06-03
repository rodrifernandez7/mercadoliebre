const path = require('path');

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
        return res.send({
            body: req.body,
            file: req.file
        });
    }
};

module.exports = usersController;