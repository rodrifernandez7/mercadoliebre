const fs = require('fs');
const path = require('path');

/* const User = require('../models/User.js'); */

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
        /* let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...req.body
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.filename, JSON.stringify(allProducts, null, 4));
        return true; */

        /* User.create(req.body);
        return res.send('Se guardó el producto.'); */
    }
}



module.exports = productsController;