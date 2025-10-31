const express = require('express');
const router = express.Router();

const {registerValidationRules, loginValidationRules} = require('../middlewares/validator');
const {register, login, logout}  = require('../controllers/auth.controller');

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.post('/logout', logout);

module.exports = router;


// // chore: initial commit - authentication backend
// - Set up Express.js backend with MongoDB
// - User model with password hashing
// - Auth routes (register, login, logout)
// - JWT token-based authentication
// - Configure secure cookies for cross-domain auth
// - Input validation with express-validator
// - Establish project structure and environment configuration