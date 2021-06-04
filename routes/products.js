const express = require('express');
const router = express.Router();
const path = require('path');

/* Controller */
const productsController = require('../controllers/productsController.js');

/* Middlewares */
const uploadFileProduct = require('../middlewares/multerProductMiddleware');

/* Vista de index */
router.get('/', productsController.index);

/* Vista de venta de producto */
router.get('/vender', productsController.create);

/* Procesamiento de creación de producto */
router.post('/', uploadFileProduct.single('product-image'), productsController.store);

module.exports = router;