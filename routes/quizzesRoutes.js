const express = require('express');
const quizController = require('../controllers/quizController');
const { auth, authRole } = require('../middlewares/auth')
const router = express.Router();

// @route   GET /quizzes
// @desc    Get all quizzes
// @access  Public
router.get('/', quizController.getAllQuizzes);

// @route   GET /quizzes/:id
// @desc    Get a quiz
// @access  Public
router.get('/:id', auth, quizController.getQuiz);

// @route   POST /quizzes
// @desc    Create a quiz
// @access  Public
router.post('/', authRole(['Creator', 'Admin', 'SuperAdmin']), quizController.createQuiz);

// @route   PATCH /quizzes/:id
// @desc    Update a quiz
// @access  Public
router.patch('/:id', authRole(['Creator', 'Admin', 'SuperAdmin']), quizController.updateQuiz);

// @route   DELETE /quizzes/:id
// @desc    Delete a quiz
// @access  Public
router.delete('/:id', authRole(['Admin', 'SuperAdmin']), quizController.deleteQuiz);

module.exports = router;