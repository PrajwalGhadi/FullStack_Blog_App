const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Checking the existence of Username and Email
    const [existingUser, existingEmail] = await Promise.all([
      userModel.findOne({ username }),
      userModel.findOne({ email }),
    ]);

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already Exists" });
    }

    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already Exists" });
    }

    // Hashing Password
    const hashPassword = await bcrypt.hash(password, 10);

    const newuser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    // Generating JWT Token
    const token = jwt.sign({ id: newuser._id, fullName: newuser.fullName || 'Anonymous' }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    //Setting Cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: newuser._id,
        username: newuser.username,
      },
    });
  } catch (error) {
    console.log("Registeration Controller Error: ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    
    if (req.user) {
      return res.status(200).json({
        success: true,
        message: 'User Already loggedIn'
      })
    }

    const { username, password } = req.body;

    const userExists = await userModel.findOne({ username });

    if (!userExists) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Generating jwt token
    const token = jwt.sign({ id: userExists._id, fullName: userExists.fullName || 'Anonymous' }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Setting Cookie
    res.cookie("token", token, {
      httpOnly: true,
      // CRITICAL FIX: Only set secure: true when running in production/HTTPS
      secure: isProduction,
      // CRITICAL FIX: SameSite='none' REQUIRES Secure: true.
      // If Secure is false, SameSite must be 'lax' or 'strict'.
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User Logged In Sucessfully",
      user: {
        id: userExists._id,
        username: userExists.username,
      },

      token
    });
  } catch (error) {
    console.log("Login Controller Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    console.log("Logout Controller Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
