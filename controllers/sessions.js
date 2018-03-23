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
  res.render('session/new.ejs');
});

router.get('/home', (req, res) => {
  res.render('session/home.ejs', {
    currentUser: req.session.currentUser
  });
});

// Create : POST   '/'                4/7 |
// User login
router.post('/', (req, res) => {
  // res.send(req.body);

  // User.findOne(
  //   {
  //     username: req.body.username
  //   }, (error, foundUser) => {
  //     if (req.body.password == foundUser.password) {
  //       res.send('logged in');
  //     } else {
  //       res.send('wrong password');
  //     };
  //   }
  // );

  // Users.findOne(
  //   {
  //     username: req.body.username
  //   }, (error, foundUser) => {
  //     if(req.body.password == foundUser.password) {
  //       req.session.currentuser = foundUser;
  //       res.redirect('/');
  //     } else {
  //       res.send('wrong password');
  //     };
  //   }
  // );

  // Compare password on login
  User.findOne(
    {
      username: req.body.username
    }, (error, foundUser) => {
      if (foundUser) {
        if (bcrypt.compareSync (req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.redirect('./');
        } else {
          res.send('wrong password');
        };
      } else {
        // res.send('username or password incorrect');
        res.render('session/new.ejs');
      };
    }
  );
});

// Delete : DELETE '/:id'             7/7 |
// Session delete route / user log out
router.delete('/', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('./');
  });
});

// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access this file in server.js          |
// Export router & require in server.js   |
// ----------------------------------------
module.exports = router;
