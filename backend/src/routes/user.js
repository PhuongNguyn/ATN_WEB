const express = require('express');

const router = express.Router();
const user = require('../app/controller/user')
const middleWareController = require('../app/controller/middleWareController')

router.post('/', user.getUserByUsername)
router.post('/getAllUser', user.getAllUser)
router.post('/create', user.createUser)
router.post('/logOut', middleWareController.verifytoken ,user.logOut)
module.exports = router