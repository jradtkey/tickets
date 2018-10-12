const express = require('express');
const Owner = require('../models/owner');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


router.get("/:id", checkAuth, (req, res, next) => {
  Owner.findOne({_id: req.params.id}).then(owner => {
    res.status(200).json({message: 'Owner', owner: owner});
  });
});


module.exports = router;
