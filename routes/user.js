const router = require('express').Router();
const userController = require('../controller/user');
const { check } = require('express-validator');
const auth = require('../middleware/isLoggedIn')

router.post('/register', [
    check('email').isEmail().withMessage('Please Enter a valid Email').normalizeEmail(),
    check('name').not().isEmpty().withMessage('Please Enter Name'),
    check('password').isLength({ min : 6}).withMessage('Please Enter 6 digit Password').trim()
] ,userController.postRegister)

router.post('/login', [
    check('email').isEmail().withMessage('Please Enter a valid Email').normalizeEmail(),
    check('password').not().isEmpty().isLength({ min : 6}).withMessage('Please Enter Password').trim()
] ,userController.postLogin)

router.get('/me', auth, userController.getUser)

module.exports = router;