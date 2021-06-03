const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../data/productsDataBase.json');

const productsController = {

    filename: productsFilePath,

    getData: function(){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productsDataBase.json'), 'utf-8'));
    },

    generateId: function(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if(lastProduct){
            return lastProduct.id +1;
        }
        return 1;
    },

    findAll: function(){
        this.getData();
    },

    findByPk: function(id){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct.id === id);
        return productFound;
    },

    findByField: function(field){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },

    index: function(req , res){
        res.render('home');
    },

    create: function(req , res){
        res.render('product-sell-form');
    },

    store: function(productData){
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.filename, JSON.stringify(allProducts, null, 4));
        return true;
    },

    delete: function (id){
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== id);
        fs.writeFileSync(this.filename, JSON.stringify(finalProducts, null, 4));
        return true;
    }
}
/* console.log(productsController.store()); */

module.exports = productsController;