const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/img/product-images'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFileName = 'productImage-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const uploadFileProduct = multer ({storage});

module.exports = uploadFileProduct;