require('dotenv').config();

// MODEL
const Agreement = require('../models/CAgreement');

// @route   GET api/agreements
// @desc    Get all agreements
// @access  Public
const getAllAgreements = async (req, res) => {
    try {
        const agreements = await Agreement.find().sort({ createdAt: -1 });

        if (!agreements) res.status(404).json({ message: 'Agreements can not be retrieved!' });

        res.json(agreements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   GET api/agreements/:id
// @desc    Get an agreement
// @access  Public
const getAgreement = async (req, res) => {
    try {
        const agreement = await Agreement.findById(req.params.id);

        if (!agreement) res.status(404).json({ message: 'Agreement can not be retrieved!' });

        res.json(agreement);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @route   POST api/agreements
// @desc    Create an agreement
// @access  Public
const createAgreement = async (req, res) => {

    const agreement = new Agreement({
        name: req.body.name,
        userID: req.body.userID,
        isAgreed: req.body.isAgreed
    });

    try {
        const newAgreement = await agreement.save();

        if (!newAgreement) res.status(400).json({ message: 'Agreement can not be created!' });

        res.status(200).json(newAgreement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   PATCH api/agreements/:id
// @desc    Update an agreement
// @access  Public
const updateAgreement = async (req, res) => {
    try {
        const agreement = await Agreement.findById(req.params.id);

        if (!Agreement) res.status(404).json({ message: 'Agreement not found' });

        agreement.name = req.body.name;
        agreement.userID = req.body.userID;
        agreement.isAgreed = req.body.isAgreed;
        const updatedAgreement = await agreement.save();

        if (!updatedAgreement) res.status(400).json({ message: 'Agreement can not be updated!' });

        res.json(updatedAgreement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// @route   DELETE api/agreements/:id
// @desc    Delete an agreement
// @access  Public
const deleteAgreement = async (req, res) => {
    try {
        const agreement = await Agreement.findById(req.params.id);
        if (!agreement) res.status(404).json({ message: 'Agreement not found' });
        
        await agreement.remove();

        res.json({ message: 'Agreement deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllAgreements,
    getAgreement,
    createAgreement,
    updateAgreement,
    deleteAgreement
}