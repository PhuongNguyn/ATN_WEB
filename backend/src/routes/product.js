const express = require('express');
const multer = require('multer')
const upload = require('../middlewares/multer')
const middleWareController = require('../app/controller/middleWareController')

const router = express.Router();
const product = require('../app/controller/product')

router.get('/' ,product.getProduct)
router.post('/create',middleWareController.verifytokenAndAuth ,product.createProduct)
router.post('/delete', middleWareController.verifytokenAndAuth, product.deleteProduct)
router.post('/edit', middleWareController.verifytokenAndAuth, product.editProduct)


module.exports = router