require('dotenv').config();

// MODEL
const Verification = require('../models/CVerification');

// @route   GET api/verifications
// @desc    Get all verifications
// @access  Public
const getAllVerifications = async (req, res) => {
    try {
        const verifications = await Verification.find().sort({ createdAt: -1 });

        if (!verifications) res.status(404).json({ message: 'verifications can not be retrieved!' });

        res.json(verifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   GET api/verifications/:id
// @desc    Get a verification
// @access  Public
const getVerification = async (req, res) => {
    try {
        const verification = await Verification.findById(req.params.id);

        if (!verification) res.status(404).json({ message: 'Verification can not be retrieved!' });

        res.json(verification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   POST api/verifications
// @desc    Create a verification
// @access  Public
const createVerification = async (req, res) => {

    const verification = new Verification({
        name: req.body.name,
        userID: req.body.userID,
        isAgreed: req.body.isAgreed
    });

    try {
        const newVerification = await verification.save();

        if (!newVerification) res.status(400).json({ message: 'Verification can not be created!' });

        res.status(200).json(newVerification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   PATCH api/verifications/:id
// @desc    Update a verification
// @access  Public
const updateVerification = async (req, res) => {
    try {
        const verification = await Verification.findById(req.params.id);

        if (!verification) res.status(404).json({ message: 'Verification not found' });

        verification.name = req.body.name;
        verification.userID = req.body.userID;
        verification.isAgreed = req.body.isAgreed;
        const updatedVerification = await verification.save();

        if (!updatedVerification) res.status(400).json({ message: 'Verification can not be updated!' });

        res.json(updatedVerification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   DELETE api/verifications/:id
// @desc    Delete a verification
// @access  Public
const deleteVerification = async (req, res) => {
    try {
        const verification = await Verification.findById(req.params.id);
        if (!verification) res.status(404).json({ message: 'Verification not found' });

        await Verification.remove();

        res.json({ message: 'Verification deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllVerifications,
    getVerification,
    createVerification,
    updateVerification,
    deleteVerification
}