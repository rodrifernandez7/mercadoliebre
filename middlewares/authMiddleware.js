function authMiddleware(req, res, next) {
    if(!req.session.userLogged) {  /* si NO tengo un usuario logeado en la session */
        return res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;