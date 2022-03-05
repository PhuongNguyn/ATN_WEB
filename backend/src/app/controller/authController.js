const jwt = require('jsonwebtoken')
let refreshTokenArray = [];
const decode = require('jwt-decode')
const userModel = require('../model/user')


const authController = {
    getUserById(id){ return new Promise(resolve=>{
        userModel.find({_id: id})
            .then(res=> {resolve(res);})
            .catch(err=> console.log(err))
    })},
    generateAccessToken(user){
        return jwt.sign({id: user.id, admin: user.admin}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1000s' });
    },
    generateRefreshToken(user){
        return jwt.sign({id: user.id, admin: user.admin}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3000s' })
    },
     requestRefreshToken(req, res){
        const refreshToken = req.body.refreshToken;
        console.log(refreshToken)
        if(!refreshToken){
            return res.status(401).json("You are not authenticated")
        }
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data)=>{
            if(err){
                console.log(err);
            }
            const user = decode(refreshToken);
            const newUser = await authController.getUserById(user.id)
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);

            return res.status(200).json({accessToken: newAccessToken, results: newUser, refreshToken: newRefreshToken})
        })
        }
}

module.exports = authController