const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ticketsRoutes = require("./routes/tickets");
const ownersRoutes = require("./routes/owners");
const userRoutes = require("./routes/users");

const app = express();

mongoose.connect("mongodb://voyajoy-slater:gs7tPA6dXJVsZgP6s6bfU7Yjr41N4gKZ5an6PmKIL9cYWDjgKywD8bvGx6cc6xSNKxxc8LFf6stfSnHe9n5ADQ==@voyajoy-slater.documents.azure.com:10255/?ssl=true&replicaSet=globaldb", { useNewUrlParser: true })
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

app.use("/api/tickets", ticketsRoutes);
app.use("/api/owners", ownersRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
