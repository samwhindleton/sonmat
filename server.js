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
