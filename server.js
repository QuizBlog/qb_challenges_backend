const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Bodyparser Middleware
app.use(express.json());
app.use(cors());

// DB Config
const db = process.env.MONGO_URI;

// Routes
const categoriesRoutes = require('./routes/categoriesRoutes');
const quizzesRoutes = require('./routes/quizzesRoutes');
const scoresRoutes = require('./routes/scoresRoutes');
const verificationsRoutes = require('./routes/verificationsRoutes');
const agreementsRoutes = require('./routes/agreementsRoutes');

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/verifications', verificationsRoutes);
app.use('/api/agreements', agreementsRoutes);

// Home route
app.get('/', async (req, res) => {
  res.send('Welcome to the qb challenges api!');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));