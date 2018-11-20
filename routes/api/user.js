const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../../models/User');

// @route   POST api/user/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(400).json({ Error: err });

    if (foundUser)
      return res.status(400).json({ Email: 'Email already exists' });

    const { name, email, password, avatarURL } = req.body;
    //console.log(name, email, password, avatarURL);
    bcrypt.hash(password, 10, (err, hash) => {
      User.create(
        { name, email, password: hash, avatarURL },
        (err, newUser) => {
          if (err) console.log(err);
          else res.json(newUser);
        }
      );
    });
  });
});

module.exports = router;
