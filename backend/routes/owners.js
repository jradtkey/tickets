const express = require('express');
const Owner = require('../models/owner');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("", (req, res, next) => {
  Owner.find().then(documents => {
    res.status(200).json({
      message: 'Owners fetched succesfully',
      owners: documents
    });
  });
});


router.post("", checkAuth, (req, res, next) => {
  console.log(req.body);
  const owner = new Owner({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    accountType: req.body.accountType,
    commission: req.body.commission,
    properties: [],
    createdAt: Date.now()
  });

  owner.save().then(createdOwner => {
    res.status(201).json({
      message: 'owner added',
      owner: createdOwner
    });
  });

});


module.exports = router;
