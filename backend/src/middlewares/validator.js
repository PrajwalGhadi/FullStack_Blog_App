const {body, validationResult} = require('express-validator')

const handleValidationErrors  = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    next();
}

const registerValidationRules = [
    body('username')
        .notEmpty().withMessage('Username is required').bail()
        .isString().withMessage('Username must be a string')
        .isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required').bail() 
        .isEmail().withMessage('Invalid email address'),
    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isString().withMessage('Password must be a string')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors 
]

const loginValidationRules = [
    body('username')
        .notEmpty().withMessage('Username is required').bail()
        .isString().withMessage('Username must be a string'),
    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isString().withMessage('Password must be a string'),
    handleValidationErrors
]

const createBlogRules = [
    body('title')
        .notEmpty().withMessage('Title is Required').bail()
        .isLength({min: 6}).withMessage('Title must be  atleast 6 Characters'),
    body('content')
        .notEmpty().withMessage('Content is Required').bail()
        .isLength({min: 6}).withMessage('Content must be atleast 6 Characters'),
    handleValidationErrors
] 

module.exports = {
    registerValidationRules,
    loginValidationRules,
    createBlogRules
}