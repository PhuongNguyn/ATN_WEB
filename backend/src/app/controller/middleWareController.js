const jwt = require('jsonwebtoken');

const middleWareController = {
    verifytoken: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err){
                    return res.status(403).json("Token is not invalid");
                }
                req.user = user;
                next();
            })
        }else{
            return res.status(401).json("You are not autenticated");
        }
    },

    verifytokenAndAuth: (req, res, next) => {
        const token = req.headers.token;
        if(token && req.body.userAccess){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err){
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
        }else{
            return res.status(401).json("You are not alowed");
        }
    }


}

module.exports = middleWareController