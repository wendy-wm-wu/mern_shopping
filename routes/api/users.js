const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');
const jwtSecret = process.env.JWT_SECRET;

// @route   POST api/users/register
// @desc    Register new user
// @access  Public 
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "please enter all fields" });
  }

  // check for existing user
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ success: false, message: "user already exists" });
      } 
      const newUser = new User({
        name,
        email,
        password
      });

      // create salt and hash 
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser.save()
            .then(user => {

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
                })
              });
            });
        });
      });
    })
    .catch(err => res.status(400).json({ success: false, message: "could not register user" }));
});


module.exports = router;
