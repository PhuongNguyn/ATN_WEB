const productRouter = require('./product')
const userRouter = require('./user')
const authRouter = require('./auth')
const orderRouter = require('./order')

function route(app){
    app.use('/products', productRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/order', orderRouter)
}

module.exports = route
