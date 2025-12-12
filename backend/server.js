require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/tasks', tasks);

const PORT = process.env.PORT || 5001;
const MONGO = process.env.MONGO_URI || '';

if (MONGO) {
  mongoose.connect(MONGO).then(()=> {
    console.log('Connected to MongoDB (tasks)');
    app.listen(PORT, ()=> console.log('Task server running on', PORT));
  }).catch(err=> {
    console.error('Mongo connect error', err);
    app.listen(PORT, ()=> console.log('Task server running without mongo on', PORT));
  });
} else {
  console.log('No MONGO_URI set. Server will run but DB operations will error.');
  app.listen(PORT, ()=> console.log('Task server running on', PORT));
}
