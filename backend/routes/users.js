const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
var jwt = require('jsonwebtoken');

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
          const token = jwt.sign({ email: result.email, userId: result._id }, 'this_is_a_secret_code_that_i_need_to_add', {expiresIn: 86400});
          res.status(201).json({
          message: "user created",
          result: result,
          token: token
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
  var fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "User doesn't exist"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Incorrect Password"
        });
      }

      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'this_is_a_secret_code_that_i_need_to_add', {expiresIn: 86400});
      userID = fetchedUser._id;
      res.status(200).json({
        token: token,
        expiresIn: 86400,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Token failed"
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

router.post('/user', (req, res, next) => {
  User.findOne({_id: req.body._id}).then(user => {
    res.status(200).json({
      user: user.name
    });
  });
});

module.exports = router;
