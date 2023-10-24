const express = require('express')
const categoryController = require('../controllers/categoryController')
const { auth, authRole } = require('../middlewares/auth')
const router = express.Router()

// @route   GET /categories
// @desc    Get all categories
// @access  Public
router.get('/', categoryController.getAllCategories)

// @route   GET /categories/:id
// @desc    Get a category
// @access  Private
router.get('/:id', auth, categoryController.getCategory)

// @route   POST /categories
// @desc    Create a category
// @access  Private
router.post('/', authRole(['Creator', 'Admin', 'SuperAdmin']), categoryController.createCategory)

// @route   PATCH /categories/:id
// @desc    Update a category
// @access  Private
router.patch('/:id', authRole(['Admin', 'SuperAdmin']), categoryController.updateCategory)

// @route   DELETE /categories/:id
// @desc    Delete a category
// @access  Private
router.delete('/:id', authRole(['Admin', 'SuperAdmin']), categoryController.deleteCategory)

module.exports = router