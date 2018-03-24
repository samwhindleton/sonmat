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
// | MODELS                               |
// ----------------------------------------
const Recipe = require('./models/recipes.js');


// ----------------------------------------
// | CONTROLLERS                          |
// ----------------------------------------
// recipe
const recipeController = require('./controllers/recipes.js');
app.use('/recipe', recipeController);
session
// session
const sessionController = require('./controllers/sessions.js');
app.use('/session', sessionController);
// user
const userController = require('./controllers/users.js');
app.use('/user', userController);


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
  Recipe.find(req.params.id, (err, foundRecipe) => {
    res.render('index.ejs', {
      currentUser: req.session.currentUser,
      recipes: foundRecipe
    });
  });
});


// ----------------------------------------
// | DATABASE                             |
// ----------------------------------------
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'sonmat';
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('The Goose is Loose!');
});


// ----------------------------------------
// | LISTENER                             |
// ----------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Now Listening on Port 3000');
});
