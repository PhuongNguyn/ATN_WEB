const express = require('express');

const router = express.Router();
const orderController = require('../app/controller/orderController')
const middleWareController = require('../app/controller/middleWareController')

router.post('/purchase',middleWareController.verifytoken, orderController.purchase)
router.post('/getall',middleWareController.verifytokenAndAuth, orderController.getAllOrder)
router.post('/getOrderByUserId', middleWareController.verifytoken, orderController.getOrderByUserId)
router.post('/changeOrderStatus', middleWareController.verifytokenAndAuth, orderController.changeOrderStatus)
router.post('/delete', middleWareController.verifytokenAndAuth, orderController.deleteOrder)



module.exports = router