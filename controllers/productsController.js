const fs = require('fs');
const path = require('path');

const productsController = {
    index: function(req , res){
        res.render('home');
    },
    sell: function(req , res){
        res.render('product-sell-form');
    },
    store: function(req , res){

    }

}

module.exports = productsController;