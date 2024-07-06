const jwt = require('jsonwebtoken')


const checkToken = (req, res, next) => {
    const token = req.headers('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()

    } catch (error) {
        res.status(400).send({ error: 'Invalid token.' });

    }
}

module.exports = checkToken