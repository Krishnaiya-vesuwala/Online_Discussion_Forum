const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtAuth = async (req, res, next) => {

    try {
        const authentication = req.headers.authorization;
        console.log(authentication)
        if (!authentication) {
            return res.status(500).json({ message: 'incorrect token' });
        }
        const token = authentication.split(' ')[1];
        const data = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = data;
        next();

    } catch (error) {
        console.log(error)
    }

}

const genAuth = async (payload) => {
    if (!process.env.JWT_SECRETKEY) {
        throw new Error('JWT_SECRETKEY is not defined');
    }
    return jwt.sign(payload, process.env.JWT_SECRETKEY)
}

module.exports = {
    genAuth, jwtAuth
}