const mongoose = require('mongoose')
const slugify = require("slugify")

const Schema = mongoose.Schema

//create a schema object
const cScoreSchema = new Schema({
  cQuiz: {
    type: Schema.Types.ObjectId,
    ref: 'CQuiz',
    unique: true
  },
  user: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  cQuestions: [
    {
      cQuestionID: {
        type: String,
        required: true
      },
      correctID: {
        type: String,
        required: true
      },
      choosenID: {
        type: String,
        required: true
      },
    }
  ],
}, { timestamps: true })

cScoreSchema.pre("validate", function (next) {
  const cScore = this

  if (cScore.title) {
    cScore.slug = slugify(`${cScore.title}`, { replacement: '-', lower: true, strict: true })
  }
  next()
})

//Score: the name of this model
module.exports = CScore = mongoose.model('CScore', cScoreSchema)