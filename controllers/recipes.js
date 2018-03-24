// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


// ----------------------------------------
// | MODELS                               |
// ----------------------------------------
const Recipe = require('../models/recipes.js');


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
router.get('/', (req, res) => {
  res.send('all recipes page');
});

router.get('/create', (req, res) => {
  res.render('recipe/create.ejs', {
    currentUser: req.session.currentUser
  });
});

// Create : POST   '/'                4/7 |
// create recipe
router.post('/', (req, res) => {
  // res.send('new recipe added!');
  Recipe.create(req.body, (error, createdRecipe) => {
    if (error) {
      res.send (error);
    } else {
      // res.send(createdRecipe);
      // res.send('new recipe added!');
      res.send(createdRecipe);
    }
  });
});

// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access this file in server.js          |
// Export router & require in server.js   |
// ----------------------------------------
module.exports = router;
