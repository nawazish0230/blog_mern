const Category = require('../model/Category');
const {validationResult} = require('express-validator')

// create category
exports.createCategory = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    try {
        const { catname } = req.body;
        const existedCategory = await Category.find({catname: catname})
        if(existedCategory.length > 0){
            return res.status(400).json({msg: 'Category already created'});
        }
        const newCategory = new Category({
            catname
        })
        const category = await newCategory.save()
        res.json(category);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get all category
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.json(categories)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// get a category
exports.getCategory = async (req, res) => {
    const categoryId = req.params.catId;
    try {
        const category = await Category.findById(categoryId);
        return res.json(category)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// update a category
exports.editCategory = async (req, res) => {
    const categoryId = req.params.catId;
    try {
        const { catname } = req.body;
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(400).json({msg: 'Category not found'});
        }
        const existedCategory = await Category.find({catname: catname});
        if(existedCategory.length > 0){
            return res.status(400).json({msg: 'Category already created'});
        }
        category.catname = catname;
        await category.save();
        return res.json(category)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}

// delete a category
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.catId;
    try {
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(400).json({msg: 'Category not found'});
        }
        await category.remove();
        return res.json(category._id)
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({error: 'Some Internal Error'})
    }
}