const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');
const morgan = require('morgan');

const app = express();

require('dotenv').config();

// PORT
const port = process.env.PORT || 5000;

// MONGODB
mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // avoids deprecation warning with findOneAnd...
    useCreateIndex: true // avoids deprecation warning with schema indexes
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// MIDDLEWARE
app.use(express.urlencoded({ extended: false })) // body parsing middleware, exposes incoming requests in req.body
app.use(express.json());
app.use(morgan('dev')) // HTTP request logger

// ROUTES
app.use('/api', require('./routes/cocktails'));
app.use('/api/users', require('./routes/users'))

// SERVE STATIC SITE IN PRODUCTION
if(process.env.NODE_ENV === 'production') {
  // serves build as static page
  app.use(express.static('client/build'));

  // wildcard param, renders page when URL doesn't match previously configured page
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))