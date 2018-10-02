const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/signUp", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });

      user.save().then(result => {
          res.status(201).json({
          message: "user created",
          result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
          console.log("error");
        })
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Login Failed"
        })
      }
      console.log("user:", user);
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Login Failed 1"
        });
      }

      // const token = jwt.sign({ email: user.email, userId: user._id }, 'this_is_a_secret_code_that_i_need_to_add', {expiresIn: 86400});

      console.log(jwt.sign);
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Login Failed 2"
      });
    })
})

router.get('', (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: 'users fetched succesfully',
      users: documents
    });
  });
});

module.exports = router;
