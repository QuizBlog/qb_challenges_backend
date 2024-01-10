require('dotenv').config();
// MODEL
const Quiz = require('../models/CQuiz');

// @route   GET api/quizzes
// @desc    Get all quizzes
// @access  Public
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().sort({ createdAt: -1 });

        if (!quizzes) res.status(404).json({ message: 'Quizzes can not be retrieved!' });

        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   GET api/quiz/:id
// @desc    Get a quiz
// @access  Public
const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) res.status(404).json({ message: 'Challenge can not be retrieved!' });

        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   POST api/quiz
// @desc    Create a quiz
// @access  Public
const createQuiz = async (req, res) => {
    const quiz = new Quiz({
        title: req.body.title,
        category: req.body.category,
        isActivated: req.body.isActivated,
        questions: req.body.questions,
        creator: req.body.creator
    });

    try {
        const newQuiz = await quiz.save();

        if (!newQuiz) res.status(400).json({ message: 'Challenge can not be created!' });

        res.status(200).json(newQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   PATCH api/quiz/:id
// @desc    Update a quiz
// @access  Public
const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        quiz.title = req.body.title;
        quiz.category = req.body.category;
        quiz.isActivated = req.body.isActivated;
        quiz.questions = req.body.questions;
        quiz.creator = req.body.creator;
        const updatedQuiz = await quiz.save();

        if (!updatedQuiz) res.status(400).json({ message: 'Challenge can not be updated!' });

        res.json(updatedQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   DELETE api/quiz/:id
// @desc    Delete a quiz
// @access  Public
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) res.status(404).json({ message: 'Quiz not found' });
        await quiz.remove();

        res.json({ message: 'Quiz deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllQuizzes,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz
}