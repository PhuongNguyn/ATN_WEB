const orderDetailModel = require('../model/orderDetail')

class OrderController{
    purchase(req, res){
        const userId = req.body.userId;
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;
        const products = req.body.product;
        console.log('done')
        products.map((product)=>{
            const orderDetail = new orderDetailModel({userId: userId, productId:product.productId, quantity: product.quantity, address: address, phoneNumber: phoneNumber});
                orderDetail.save()
                    .then((mess)=>{
                        res.status(201).json("success")
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
        })
        
    }

    getAllOrder(req, res){
                orderDetailModel.find({deleted:false})
                    .then((orderDetail)=>{
                        return res.status(200).json({orderDetail: orderDetail})
                    })
                .catch((err)=> console.log(err))
    }

    getOrderByUserId(req, res){
                orderDetailModel.find({userId: req.body.userId, deleted: false})
                    .then((orderDetailItem) => {
                        res.status(201).json({orderDetail: orderDetailItem})
                    })
                    .catch(err=>console.log(err))
               
    }

    changeOrderStatus(req, res){
        orderDetailModel.findOne({_id: req.body.orderDetailId})
            .then((result)=>{
                result.updateOne({status: !result.status})
                    .then((data)=>res.status(201).json("done"))                
            })
            .catch((err)=> console.log(err))
    }

    deleteOrder(req, res){
        orderDetailModel.delete({_id: req.body.orderDetailId})
            .then((results) => res.status(201).json('succes'))
            .catch((err) => console.log(err));
    }
}

module.exports = new OrderController