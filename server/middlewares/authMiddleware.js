const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No authorization header or it does not start with 'Bearer '");
        return res.status(401).json({
            error: "Unauthorized. Please add a valid token"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = decoded; 
        console.log("req.user set:", req.user); // Confirm req.user is set
        next();
    } catch (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({
            error: "Unauthorized. Invalid token"
        });
    }
};

module.exports = authenticationMiddleware;
