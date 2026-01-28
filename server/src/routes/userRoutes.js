const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');

router.post('/register',[
    body('name').isLength({min : 3}).withMessage('Name must at least 5 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long.')
],userController.registerUser);

module.exports = router;

