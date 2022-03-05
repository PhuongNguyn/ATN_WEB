const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');


const OrderDetail = mongoose.Schema({
    userId: String,
    productId: String, 
    quantity: Number,
    phoneNumber: Number,
    address: String,
    status: {type: Boolean, default: false}
},{
    timestamps: true
})


OrderDetail.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
})

module.exports = mongoose.model('OrderDetails', OrderDetail)