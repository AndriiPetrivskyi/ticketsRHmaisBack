// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = "3d2p9S!fG#u8hR2%zX9k@j7LbT3mW";

const authenticateToken = (req, res, next) => {
  console.log("req: ", req.headers);
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
