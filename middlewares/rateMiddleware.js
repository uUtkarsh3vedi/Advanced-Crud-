const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
    windowMs: 15 *60 *1000,
    max:100,
    message: 'Too many requerst from this IP please Try again Later',
})

const adminLimiter =rateLimit({
    windowMs: 15 * 60 *1000,
    max:200,
    message: 'Admin request Limit exceeded'
})

const managerLimiter = rateLimit({
    windowMs: 15*60*1000,
    max:50,
    message:'Manager Rimit Exceeded'
})
const userLimiter = rateLimit({
    windowMs: 15*60*1000,
    max:50,
    message:'User Rimit Exceeded'
})
const roleBasedEmitter = (req,res,next) => {
    const role = req.user.role;
    if(role=='Admin'){
        return adminLimiter(req,res,next);

    } else if (role=='Manager'){
        return managerLimiter(req,res,next);
    } else if (role=='User'){
        return userLimiter (req,res,next)
    } else {
        return generalLimiter(req,res,next)
    }

}

module.exports = roleBasedEmitter