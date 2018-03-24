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
  Recipe.find(req.params.id, (err, foundRecipe) => {
    res.render('recipe/index.ejs', {
      recipes: foundRecipe
    });
  });
});

router.get('/create', (req, res) => {
  res.render('recipe/create.ejs', {
    currentUser: req.session.currentUser
  });
});

// Show   : GET    '/:id'             2/7 |
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render('recipe/show.ejs', {
      recipes: foundRecipe
    });
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
      // res.send(createdRecipe);
      res.redirect('/recipe/' + createdRecipe.id);
    }
  });
});

// Edit   : GET    '/:id/edit'        5/7 |
router.get('/:id/edit', (req, res) => {
  if (req.session.currentUser) {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
      if (req.session.currentUser.username === foundRecipe.username) {
        // res.send('you created this recipe');
        res.render('recipe/edit.ejs', {
          currentUser: req.session.currentUser,
          id: req.params.index,
          recipe: foundRecipe
        });
      } else {
        // res.send('you did not create this recipe');
        res.redirect('/recipe/' + foundRecipe.id);
      };
    });
  } else {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
      res.redirect('/recipe/' + foundRecipe.id);
    });
  }
});

// Update : PUT    '/:id'             6/7 |
router.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body,
  {new: true}, (error, updatedRecipe) => {
    res.redirect('/recipe/' + updatedRecipe.id);
  });
});

// Delete : DELETE '/:id'             7/7 |
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/session/home');
  });
});

router.delete('/', (req, res) => {
  const currentUser = req.session.currentUser;
  const user = currentUser.username;
  Recipe.deleteMany(
    {
      username: {$all: user}
    }, () => {
      res.redirect('/session/home');
  });
});

// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access this file in server.js          |
// Export router & require in server.js   |
// ----------------------------------------
module.exports = router;
