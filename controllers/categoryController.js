require('dotenv').config();

// MODEL
const Category = require('../models/Category');

// @route   GET api/category
// @desc    Get all categories
// @access  Public
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        if (!categories) res.status(404).json({ message: 'Categories can not be retrieved!' });

        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   GET api/category/:id
// @desc    Get a category
// @access  Public
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) res.status(404).json({ message: 'Category can not be retrieved!' });

        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   POST api/category
// @desc    Create a category
// @access  Public
const createCategory = async (req, res) => {
    const category = new Category({
        title: req.body.title,
        createdBy: req.body.createdBy
    });

    try {
        const newCategory = await category.save();

        if (!newCategory) res.status(400).json({ message: 'Category can not be created!' });

        res.status(200).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   PATCH api/category/:id
// @desc    Update a category
// @access  Public
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        category.title = req.body.title;
        category.createdBy = req.body.createdBy;
        const updatedCategory = await category.save();

        if (!updatedCategory) res.status(400).json({ message: 'Category can not be updated!' });

        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   DELETE api/category/:id
// @desc    Delete a category
// @access  Public
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        await category.remove();

        if (!category) res.status(404).json({ message: 'Category not found' });

        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}