const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post("/api/tickets", (req, res, next) => {
  const ticket = req.body;
  console.log(ticket);
  res.status(201).json({
    message: 'ticket added'
  });
})

app.get('/api/tickets',(req, res, next) => {
  const tickets = [
    {
      id: '8ew9e8n9w9b8oi',
      platform: 'VRBO',
      inquiryType: 'Inquiry',
      firstName: 'Bob',
      lastName: 'Henry',
      checkIn: '12-02-2018',
      checkOut: '12-05-2018',
      property: '1328 Scott St',
      propertyOwner: 'Joseph Sartuche',
      platformImage: "https://drive.google.com/thumbnail?id=17Rxa0hF9_5FcGsFTvTu0xGp72PBntj8x",
      status: 'Waiting on guest'
    },
    {
      id: '9834hsv4g3g4',
      platform: 'Airbnb',
      inquiryType: 'Booking Request',
      firstName: 'Jess',
      lastName: 'Mott',
      checkIn: '11-20-2018',
      checkOut: '11-25-2018',
      property: '9416 Clemente',
      propertyOwner: 'Yvonne Phun',
      platformImage: "https://drive.google.com/thumbnail?id=1g_qFKFiu0xHonp68pPevLlzuf8iMN7Ky",
      status: 'Waiting on owner'
    }
  ]
  res.status(200).json({
    message: 'Tickets fetched succesfully',
    tickets: tickets
  });
})

module.exports = app;
