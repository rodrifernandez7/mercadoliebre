const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController.js');

router.get('/', productsController.index);
router.get('/vender', productsController.sell);

router.post('/', productsController.store);

module.exports = router;