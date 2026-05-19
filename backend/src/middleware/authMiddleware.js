const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //check for token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  //verify token
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
