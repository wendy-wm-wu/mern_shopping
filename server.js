const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

  app.use('/api/items', items);

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
