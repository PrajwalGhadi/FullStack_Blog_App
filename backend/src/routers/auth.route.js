const express = require('express');
const router = express.Router();


const {registerValidationRules, loginValidationRules} = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth.middleware')
const {register, login, logout}  = require('../controllers/auth.controller');

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.post('/logout', logout);

module.exports = router;