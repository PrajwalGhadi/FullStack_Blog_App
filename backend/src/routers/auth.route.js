const express = require('express');
const router = express.Router();


const {registerValidationRules, loginValidationRules} = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth.middleware')
const {register, login, logout, getLoggedInUser}  = require('../controllers/auth.controller');

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.post('/logout', logout);
router.get('/getLoggedInUser', authMiddleware, getLoggedInUser)

module.exports = router;