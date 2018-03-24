// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const mongoose = require('mongoose');


// ----------------------------------------
// | SCHEMA                               |
// ----------------------------------------
// --------------------                   |
// Setup              |                   |
// --------------------                   |
// ----------------------------------------
const recipeSchema = new mongoose.Schema(
  {
    username: {type: String, required: true},
    title: {type: String, required: true},
    image: String,
    description: {type: String, required: true},
    ingredients: {type: String, required: true},
    directions: {type: String, required: true}
  }
);


// ----------------------------------------
// | MODEL                                |
// ----------------------------------------
// --------------------                   |
// Setup              |                   |
// --------------------                   |
// ----------------------------------------
const Recipe = mongoose.model('Recipe', recipeSchema);


// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access Users in controllers/users.js   |
// ----------------------------------------
module.exports = Recipe;
