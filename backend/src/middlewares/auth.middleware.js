const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.token;
    console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        isLogin: false,
        message: "Please Login or Register",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decode.id, fullName: decode.fullName };

    next();
  } catch (error) {
    console.log("Error from authMiddleware: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
}

module.exports = authMiddleware;
