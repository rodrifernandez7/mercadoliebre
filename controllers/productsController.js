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

        let productToCreate = {
            ...req.body,
            productImage: req.file.originalname
        }

        let productCreated = Product.create(productToCreate);
        
        return res.send('Se creo el producto correctamente.');
        
    }
}



module.exports = productsController;