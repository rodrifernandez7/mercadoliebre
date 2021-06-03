const path = require('path');

const homeController = {
    home: function(req , res){
        /* let htmlPath = path.join(__dirname,'../views/home.html' );
        res.sendFile(htmlPath); */
        res.render('home');
    }
};

module.exports = homeController;