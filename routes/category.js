const router = require('express').Router();
const categoryController = require('../controller/category');
const { check } = require('express-validator');
const isLoggedIn = require('../middleware/isLoggedIn');

// create category
router.post('/create', isLoggedIn, [
    check('catname', 'Enter category field').not().isEmpty(),
] ,categoryController.createCategory)

// get all category
router.get('/get-all-category', categoryController.getAllCategories)

// get a category
router.get('/get-category/:catId', categoryController.getCategory)

// update category
router.put('/edit-category/:catId', isLoggedIn, categoryController.editCategory)

// delete category
router.delete('/delete-category/:catId', isLoggedIn, categoryController.deleteCategory)


module.exports = router