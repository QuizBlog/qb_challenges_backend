const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const cVerificationSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

module.exports = CVerification = mongoose.model('CVerification', cVerificationSchema)