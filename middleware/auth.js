const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) {
        res.status(401).json({ msg:'Access denied' })
    }

    try {
        const cypher = jwt.verify(token, process.env.SECRET_KEY);
        req.user = cypher.user;
        next()
    } catch(e) {
        res.status(401).json({ msg:'Invalid Token' })
    }
}