const productModel = require('../model/product')
const multer = require('multer')
const path = require('path')




class Product {
    getProduct(req, res){
        productModel.find({deleted: false})
            .then((results)=>{
                res.status(200).json(results)
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    createProduct(req, res){
        const body = req.body; 
        if(req.files != undefined && req.files != null){
            body.selectedImage = [];
            Object.values(req.files).map((file) => {
                file.mv(path.join(__dirname,`../../../../client/public/uploads`, file.name), (err)=>{
                    console.log(err);
                })
                body.selectedImage.push(file.name);
            })
        }
        
        const product = new productModel(body)
        product.save()
            .then((results)=>{
                res.status(200).json("success");
            })            .catch((err)=>{
                console.log(err);
            })
        
    }

    deleteProduct(req, res){
        const id = req.body.id;
        productModel.delete({_id: id})
            .then(()=>{
                res.status(200).json({message: 'success'});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    editProduct(req, res){
        const body = req.body;
        const id = body.id;
        if(req.files != undefined && req.files != null){
            body.selectedImage = [];
            Object.values(req.files).map((file) => {
                file.mv(path.join(__dirname,`../../../../client/public/uploads`, file.name), (err)=>{
                    console.log(err);
                })
                body.selectedImage.push(file.name);
            })
        }
        
        productModel.updateOne({_id: id}, body)
            .then(()=> res.status(200).json({message:'success'}))
            .catch((err)=> console.log(err));
    }
}

module.exports = new Product()