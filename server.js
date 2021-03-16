const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const itemRoutes = require('./routes/api/items');
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

  // Use routes 
  app.use('/api/items', itemRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);

  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
