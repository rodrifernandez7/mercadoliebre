const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../data/productsDataBase.json');

const Product = {

    filename: productsFilePath,

    getData: function(){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productsDataBase.json'), 'utf-8'));
    },

    generateId: function(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop(); /* saca el ultimo elemento del array */
        if(lastProduct){
            return lastProduct.id +1;
        }
        return 1;
    },

    findAll: function(){
        return this.getData()
    },

    findByPk: function(id){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct.id === id);
        return productFound;
    },

    findByField: function(field, text){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },

    create: function(productData){
        let allProducts = this.findAll();
        let newProduct = {
            id:this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.filename, JSON.stringify(allProducts, null, 4));
        return newProduct;
    },

    delete: function(id){
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== id);
        fs.writeFileSync(this.filename, JSON.stringify(finalProducts, null, 4));
        return true;
    }

}

module.exports = Product;