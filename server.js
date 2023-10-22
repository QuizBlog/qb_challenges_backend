const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
// app.use('/api/items', require('./routes/api/items'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));