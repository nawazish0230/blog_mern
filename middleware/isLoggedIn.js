const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/dev');
const User = require('../model/User');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({msg: 'no token, authorization denied'});
    }

    try {
        const decoded = await jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded._id)
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'token is not valid'});
    }
}