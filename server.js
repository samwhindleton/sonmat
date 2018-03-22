// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');


// ----------------------------------------
// | MIDDLEWARE                           |
// ----------------------------------------
// bodyParser
app.use(express.urlencoded({ extended: false }));
// serve static files (css/js)
app.use(express.static('public'));
// method-override
app.use(methodOverride('_method'));
// express-session
app.use(session(
  {
    secret: "pinkdotsandchapstick", // any random string
    resave: false,
    saveUninitialized: false
  }
));


// ----------------------------------------
// | ROUTES                               |
// ----------------------------------------
// --------------------                   |
// 7 Restful Routes   |                   |
// --------------------                   |
// Index  : GET    '/'                1/7 |
// Show   : GET    '/:id'             2/7 |
// New    : GET    '/new'             3/7 |
// Create : POST   '/'                4/7 |
// Edit   : GET    '/:id/edit'        5/7 |
// Update : PUT    '/:id'             6/7 |
// Delete : DELETE '/:id'             7/7 |
// ----------------------------------------

// Index  : GET    '/'                1/7 |
app.get( '/' , (req, res) => {
  // res.send('Hello, World!');
  res.render('index.ejs');
});

// GET    '/login'                        |
app.get( '/login' , (req, res) => {
  res.send('users login in page');
});

// GET    '/signup'                       |
app.get( '/signup' , (req, res) => {
  res.send('users signup page');
});


// ----------------------------------------
// | DATABASE                             |
// ----------------------------------------
mongoose.connect('mongodb://localhost:27017/' + 'sonmat');
mongoose.connection.once('open', () => {
  console.log('The Goose is Loose!');
});


// ----------------------------------------
// | LISTENER                             |
// ----------------------------------------
app.listen(3000, () => {
  console.log('Now Listening on Port 3000');
});
