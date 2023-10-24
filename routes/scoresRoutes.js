const express = require('express');
const scoreController = require('../controllers/scoreController');
const { auth, authRole } = require('../middlewares/auth')
const router = express.Router();

// @route   GET /scores
// @desc    Get all scores
// @access  Public
router.get('/', authRole(['Creator', 'Admin', 'SuperAdmin']), scoreController.getAllScores);

// @route   GET /scores/:id
// @desc    Get a score
// @access  Public
router.get('/:id', auth, scoreController.getScore);

// @route   POST /scores
// @desc    Create a score
// @access  Public
router.post('/', auth, scoreController.createScore);

// @route   PATCH /scores/:id
// @desc    Update a score
// @access  Public
router.patch('/:id', auth, scoreController.updateScore);

// @route   DELETE /scores/:id
// @desc    Delete a score
// @access  Public
router.delete('/:id', authRole(['Creator', 'Admin', 'SuperAdmin']), scoreController.deleteScore);

module.exports = router;