const fs = require('fs');
const path = require('path');

const Product = require('../models/Products.js');

const productsController = {

    index: function(req , res)  {
        console.log(this);
        let allProducts = this.findAll();
        
        return res.send(allProducts);
        res.render('home');
    },

    create: function(req , res){
        res.render('product-sell-form');
    },

    store: function(req , res){

        Product.create(req.body);
        return res.send('Se guardó el usuario.');
        
    }
}



module.exports = productsController;