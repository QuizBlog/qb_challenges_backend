const mongoose = require('mongoose')
const slugify = require("slugify")

const Schema = mongoose.Schema

//create a schema object
const ScoreSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  questions: [
    {
      img: {
        type: String
      },
      title: {
        type: String,
        required: true
      },
      options: [
        {
          img: {
            type: String
          },
          text: {
            type: String,
            required: true
          },
          isCorrect: {
            type: Boolean,
            required: true
          },
          isChosen: {
            type: Boolean,
            required: true
          }
        }
      ],
    }
  ],
  savedBy: {
    type: String,
    required: true
  }
}, { timestamps: true })

ScoreSchema.pre("validate", function (next) {
  const score = this

  if (score.title) {
    score.slug = slugify(`${score.title}`, { replacement: '-', lower: true, strict: true })
  }
  next()
})

//Score: the name of this model
module.exports = Score = mongoose.model('score', ScoreSchema)