const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Ticket = require('./models/ticket');

const app = express();

mongoose.connect("mongodb://testradtkey:oICOMVKA82s3vVhVoRK0DgLM1vBkoLdE8BRolhQTJJywUPvIpLTMIxVVX85K6PDUN6QY7aLakjgdfVWVtNLn0g==@testradtkey.documents.azure.com:10255/?ssl=true&replicaSet=globaldb", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})

app.post("/api/tickets", (req, res, next) => {
  const ticket = new Ticket({
    platform: req.body.platform,
    inquiryType: req.body.inquiryType,
    guestName: req.body.guestName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    property: req.body.property,
    propertyOwner: req.body.propertyOwner,
    platformImage: req.body.platformImage,
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

app.put("/api/tickets/:id", (req, res, next) => {
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
    status: req.body.status
  });
  Ticket.updateOne({_id: req.params.id}, ticket).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  })
});

app.get('/api/tickets',(req, res, next) => {
  Ticket.find().then(documents => {
    res.status(200).json({
      message: 'Tickets fetched succesfully',
      tickets: documents
    });
  });
});

app.delete('/api/tickets/:id', (req, res, next) => {
  Ticket.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Ticket deleted' });
  })
})

module.exports = app;
