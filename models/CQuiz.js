const mongoose = require('mongoose')
const slugify = require("slugify")

const Schema = mongoose.Schema

//create a schema object
const cQuizSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'CCategory',
    unique: true
  },
  isActivated: {
    type: Boolean,
    default: false
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
          }
        }
      ],
    }
  ],
  creator: {
    type: String,
    required: true
  }
}, { timestamps: true })

cQuizSchema.pre("validate", function (next) {
  const cQuiz = this

  if (cQuiz.title) {
    cQuiz.slug = slugify(`${cQuiz.title}`, { replacement: '-', lower: true, strict: true })
  }
  next()
})

//Quiz: the name of this model
module.exports = CQuiz = mongoose.model('CQuiz', cQuizSchema)