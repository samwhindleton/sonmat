// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const router = express.Router();


// ----------------------------------------
// | MODELS                               |
// ----------------------------------------
const Recipe = require('../models/recipes.js');


// Seed Route
router.get('/add-new-recipes', (req, res) => {
  const newRecipes = [
    {
      username: "sonmat",
      title: "test 1",
      image: "",
      description: "test 1",
      ingredients: "test 1",
      directions: "test 1"
    },
    {
      username: "sonmat",
      title: "test 2",
      image: "",
      description: "test 2",
      ingredients: "test 2",
      directions: "test 2"
    },
    {
      username: "sonmat",
      title: "test 3",
      image: "",
      description: "test 3",
      ingredients: "test 3",
      directions: "test 3"
    },
  ];
  // create recipes from newRecipes
  Recipe.create(newRecipes, (err, recipe) => {
    if (err) {
      res.send(err);
    }
    res.redirect('/recipe');
  });
});

// Delete Recipes From Seed
router.get('/delete-sonmat-recipes', (req, res) => {
  Recipe.deleteMany(
    {
      username: {$all: "sonmat"}
    }, () => {
      res.send('deleted');
  });
});

// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access this file in server.js          |
// Export router & require in server.js   |
// ----------------------------------------
module.exports = router;
