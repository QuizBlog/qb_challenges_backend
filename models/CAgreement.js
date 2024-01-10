const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const cAgreementSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    isAgreed: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

module.exports = CAgreement = mongoose.model('CAgreement', cAgreementSchema)