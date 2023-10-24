require('dotenv').config();

// MODEL
const Score = require('../models/Score');

// @route   GET api/score
// @desc    Get all scores
// @access  Public
const getAllScores = async (req, res) => {
    try {
        const scores = await Score.find().sort({ createdAt: -1 });

        if (!scores) res.status(404).json({ message: 'Scores can not be retrieved!' });

        res.json(scores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   GET api/score/:id
// @desc    Get a score
// @access  Public
const getScore = async (req, res) => {
    try {
        const score = await Score.findById(req.params.id);

        if (!score) res.status(404).json({ message: 'Score can not be retrieved!' });

        res.json(score);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   POST api/score
// @desc    Create a score
// @access  Public
const createScore = async (req, res) => {
    const score = new Score({
        title: req.body.title,
        createdBy: req.body.createdBy
    });

    try {
        const newScore = await score.save();

        if (!newScore) res.status(400).json({ message: 'Score can not be created!' });

        res.status(200).json(newScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   PATCH api/score/:id
// @desc    Update a score
// @access  Public
const updateScore = async (req, res) => {
    try {
        const score = await Score.findById(req.params.id);
        score.title = req.body.title;
        score.createdBy = req.body.createdBy;
        const updatedScore = await score.save();

        if (!updatedScore) res.status(400).json({ message: 'Score can not be updated!' });

        res.json(updatedScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   DELETE api/score/:id
// @desc    Delete a score
// @access  Public
const deleteScore = async (req, res) => {
    try {
        const score = await Score.findById(req.params.id);
        await score.remove();
        if (!score) res.status(404).json({ message: 'Score not found' });

        res.json({ message: 'Score deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllScores,
    getScore,
    createScore,
    updateScore,
    deleteScore
}