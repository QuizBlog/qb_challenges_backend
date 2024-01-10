const express = require('express');
const agreementController = require('../controllers/agreementController');
const { auth, authRole } = require('../middlewares/auth')
const router = express.Router();

// @route   GET /agreements
// @desc    Get all agreements
// @access  Public
router.get('/', authRole(['Creator', 'Admin', 'SuperAdmin']), agreementController.getAllAgreements);

// @route   GET /agreements/:id
// @desc    Get an agreement
// @access  Public
router.get('/:id', auth, agreementController.getAgreement);

// @route   POST /agreements
// @desc    Create an agreement
// @access  Public
router.post('/', auth, agreementController.createAgreement);

// @route   PATCH /agreements/:id
// @desc    Update an agreement
// @access  Public
router.patch('/:id', auth, agreementController.updateAgreement);

// @route   DELETE /agreements/:id
// @desc    Delete an agreement
// @access  Public
router.delete('/:id', authRole(['Creator', 'Admin', 'SuperAdmin']), agreementController.deleteAgreement);

module.exports = router;