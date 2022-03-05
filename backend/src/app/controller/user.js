const userModel = require('../model/user')
const path = require('path')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const authController = require('./authController')



class User {
  

    getUserByUsername(req, res){
        userModel.find({ userName: req.body.userName, password: req.body.password })
            .then((results) => {  
                const accessToken = jwt.sign({id: results[0]._id, admin: results[0].userAccess}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
                const refreshToken = jwt.sign({id: results[0]._id, admin: results[0].userAccess}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' })
                res.status(200).json({results, accessToken, refreshToken}) 
            })
            .catch((err)=>{
                console.log(err);
            })
    }


    createUser(req, res){
        const file = Object.values(req.files)[0];
        file.mv(path.join(__dirname,`../../../../client/public/uploads`, file.name), (err) => {
            console.log(err);
        })
        const body = req.body;
        body.userImage = file.name;
        const User = new userModel(body);
        User.save()
            .then((results) => res.status(200).json({message: 'Create Success'}))
            .catch((err)=>{
                console.log(err);
            })
    }

    logOut(req, res){
        res.clearCookie("refreshToken");
        res.status(200).json("Logged Out")
    }

    getAllUser(req, res){
        userModel.find()
            .then((results)=>{
                res.status(201).json(results);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    
}

module.exports = new User();