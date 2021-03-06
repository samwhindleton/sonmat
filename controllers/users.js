// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


// ----------------------------------------
// | MODELS                               |
// ----------------------------------------
const User = require('../models/users.js');


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
router.get('/new', (req, res) => {
  // res.send('create new user page');
  res.render('user/new.ejs', {
    currentUser: req.session.currentUser
  });
});


// Create : POST   '/'                4/7 |
// Create new user
router.post('/', (req, res) => {
  // res.send(req.body);
  User.findOne(
    {
      username: req.body.username
    }, (error, foundUser) => {
      if (foundUser) {
        // res.send('username already taken');
        res.render('user/new.ejs', {
          currentUser: req.session.currentUser
        });
      } else {
        // Encrypt password on Create/register new user
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        User.create(req.body, (error, createdUser) => {
          if (error) {
            res.send (error);
          } else {
            // res.send('Welcome ' + user.username + '!');
            req.session.currentUser = createdUser;
            // res.render('./index.ejs', {currentUser:createdUser});
            res.redirect('./')
          };
        });
      };
    }
  );
});

// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access this file in server.js          |
// Export router & require in server.js   |
// ----------------------------------------
module.exports = router;
