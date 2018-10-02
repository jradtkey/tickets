const express = require('express');
const Ticket = require('../models/ticket');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
  const ticket = new Ticket({
    platform: req.body.platform,
    inquiryType: req.body.inquiryType,
    guestName: req.body.guestName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    property: req.body.property,
    propertyOwner: req.body.propertyOwner,
    platformImage: req.body.platformImage,
    accountType: req.body.accountType,
    assignedTo: req.body.assignedTo,
    status: req.body.status
  });
  console.log(ticket);
  ticket.save().then(createdTicket => {
    res.status(201).json({
      message: 'ticket added',
      ticketId: createdTicket._id
    });
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  const ticket = new Ticket({
    _id: req.body.id,
    platform: req.body.platform,
    inquiryType: req.body.inquiryType,
    guestName: req.body.guestName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    property: req.body.property,
    propertyOwner: req.body.propertyOwner,
    platformImage: req.body.platformImage,
    accountType: req.body.accountType,
    assignedTo: req.body.assignedTo,
    status: req.body.status
  });
  Ticket.updateOne({_id: req.params.id}, ticket).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  })
});

router.get('', (req, res, next) => {
  Ticket.find().then(documents => {
    res.status(200).json({
      message: 'Tickets fetched succesfully',
      tickets: documents
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Ticket.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Ticket deleted' });
  })
})

module.exports = router;
