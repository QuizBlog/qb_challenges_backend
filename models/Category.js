const mongoose = require('mongoose');
const slugify = require("slugify")
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
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
    createdBy: {
        type: String,
        required: true
    },
}, { timestamps: true });

CategorySchema.pre("validate", function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { replacement: "-", lower: true, strict: true })
    }
    next()
})

module.exports = Category = mongoose.model('category', CategorySchema);