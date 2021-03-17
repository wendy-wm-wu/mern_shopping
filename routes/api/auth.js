const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
require('dotenv').config();

const User = require('../../models/user');
const jwtSecret = process.env.JWT_SECRET;

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check for existing user
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ success: false, message: "User does not exist" });
      }
      // validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
          }
          const payload = { id: user.id };
          jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err; 
            res.status(200).json({
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              },
              access_token: token,
              expires_in: 3600,
            });
          });
        })
      
    })
    .catch(err => res.status(400).json({ success: false, message: "Could not verify user" }));
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ success: false, message: "Could not verify user" }));
});

module.exports = router;
