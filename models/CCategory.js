const mongoose = require('mongoose');
const slugify = require("slugify")
const Schema = mongoose.Schema;

// Create Schema
const cCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: String,
        required: true
    },
}, { timestamps: true });

cCategorySchema.pre("validate", function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { replacement: "-", lower: true, strict: true })
    }
    next()
})

module.exports = CCategory = mongoose.model('CCategory', cCategorySchema);