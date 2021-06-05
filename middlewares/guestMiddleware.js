function guestMiddleware(req, res, next) {
    if(req.session.userLogged) {  /* si tengo un usuario logeado en la session */
        return res.redirect('/users/profile');
    }
    next();
}

module.exports = guestMiddleware;