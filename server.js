const express = require('express');
const mongoose = require('mongoose');

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

// SERVE STATIC IN PRODUCTION
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// ROUTES
app.use('/api', require('./routes/cocktails'));
app.use('/api/users', require('./routes/users'))
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))