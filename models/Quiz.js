const mongoose = require('mongoose')
const slugify = require("slugify")

const Schema = mongoose.Schema

//create a schema object
const QuizSchema = new Schema({
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
          }
        }
      ],
    }
  ],
  takenBy: {
    type: String,
    required: true
  }
}, { timestamps: true })

QuizSchema.pre("validate", function (next) {
  const quiz = this

  if (quiz.title) {
    quiz.slug = slugify(`${quiz.title}`, { replacement: '-', lower: true, strict: true })
  }
  next()
})

//Quiz: the name of this model
module.exports = Quiz = mongoose.model('quiz', QuizSchema)