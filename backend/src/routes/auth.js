const express = require('express')

const route = express.Router();
const authController = require('../app/controller/authController')

route.post('/refreshToken', authController.requestRefreshToken)

module.exports = route