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

  const owner = new Owner({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    accountType: req.body.accountType,
    commission: req.body.commission,
    properties: [
      {
        title: '',
        addressStreet: '',
        addressCity: '',
        addressState: '',
        adressZip: '',
        status: '',
        owner_airbnb_link: '',
        owner_booking_link: '',
        owner_tripAdvisor_link: '',
        owner_vrboHomeAway_link: '',
        owner_other_links:[],
        vj_airbnb_link: '',
        vj_booking_link: '',
        vj_tripAdvisor_link: '',
        vj_vrboHomeAway_link: '',
        vj_other_links:[]
      }
    ],
    notes: [
      {
        note: ''
      }
    ],
    createdAt: Date.now()
  });

  console.log(owner);

  owner.save().then(createdOwner => {
    res.status(201).json({
      message: 'owner added',
      owner: createdOwner
    });
  });



});


module.exports = router;
