const jwt = require("jsonwebtoken")

const authenticationMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.role = payload.role
        next()
    } catch (error) {
        console.log(error, `<=================== error ==================`);
        return res.status(401).json({ message: "Token not valid" })
    }
}

const authorizationMiddleware = ({ roles }) => (req, res, next) => {
    if (!roles.includes(req.role)) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    next()
}

module.exports = {
    authorizationMiddleware,
    authenticationMiddleware
}