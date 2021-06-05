const User = require('../models/User');


function userLoggedMiddleware(req, res, next) {  /* middleware armado para mostrar o no en este caso, en el navbar distintas cosas dependiendo si estamos logeados o no */
    res.locals.isLogged = false;                    /* debemos ir a la vista en este caso header.ejs e implementar los tags */

    let userNameInCookie = req.cookies.userName;   /* se fija si hay alguien en la cookie */
    let userNameFromCookie = User.findByField('userName', userNameInCookie);   /* lo encuentra en la base de datos */

    /* console.log(userNameFromCookie); */

    if(userNameFromCookie) {
        req.session.userLogged = userNameFromCookie;  /* para pasarlo a session */
    }
    
    if(req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    
    next();
}

module.exports = userLoggedMiddleware;