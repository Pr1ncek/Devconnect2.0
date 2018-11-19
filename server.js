const express = require('express');
const mongoose = require('mongoose');

// import express routers
const userRoutes = require('./routes/api/user');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/post');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose.connect(
  db,
  err => {
    err ? console.log(err) : console.log('Mlab connected');
  }
);

app.get('/', (req, res) => res.send('Hello, World!'));

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/post', postRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sever running on ${port}`);
});
