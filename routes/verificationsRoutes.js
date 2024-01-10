const express = require('express');
const verificationController = require('../controllers/verificationController');
const { auth, authRole } = require('../middlewares/auth')
const router = express.Router();

// @route   GET /verifications
// @desc    Get all verifications
// @access  Public
router.get('/', authRole(['Creator', 'Admin', 'SuperAdmin']), verificationController.getAllVerifications);

// @route   GET /verifications/:id
// @desc    Get a verification
// @access  Public
router.get('/:id', auth, verificationController.getVerification);

// @route   POST /verifications
// @desc    Create a verification
// @access  Public
router.post('/', auth, verificationController.createVerification);

// @route   PATCH /verifications/:id
// @desc    Update a verification
// @access  Public
router.patch('/:id', auth, verificationController.updateVerification);

// @route   DELETE /verifications/:id
// @desc    Delete a verification
// @access  Public
router.delete('/:id', authRole(['Creator', 'Admin', 'SuperAdmin']), verificationController.deleteVerification);

module.exports = router;