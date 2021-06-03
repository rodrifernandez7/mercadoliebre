'use-strict'

const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../data/productsDataBase.json');

const productsController = {

    filename: productsFilePath,

    getData(){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productsDataBase.json'), 'utf-8'));
    },

    generateId(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop(); /* saca el ultimo elemento del array */
        if(lastProduct){
            return lastProduct.id +1;
        }
        return 1;
    },

    findAll() {
        
        return this.getData()
    },

    findByPk(id){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct.id === id);
        return productFound;
    },

    findByField(field){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },

    index(req , res)  {
        console.log(this);
        let allProducts = this.findAll();
        
        return res.send(allProducts);
        res.render('home');
    },

    create(req , res){
        res.render('product-sell-form');
    },

    store(req , res){
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...req.body
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.filename, JSON.stringify(allProducts, null, 4));
        return true;
    },

    delete (req, res){
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== req.params.id);
        fs.writeFileSync(this.filename, JSON.stringify(finalProducts, null, 4));
        return true;
    }
}
console.log(productsController.findAll());

module.exports = productsController;