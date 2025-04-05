const {body} = require('express-validator');

const validateUserInput=[
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min:6})
    .withMessage('Password must be at least 6 characters'),
];

module.exports=validateUserInput;