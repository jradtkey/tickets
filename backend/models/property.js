const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const propertySchema = mongoose.Schema({
  title: String,
  addressStreet: String,
  addressCity: String,
  addressState: String,
  adressZip: String,
  status: String,
  owner_airbnb_link: String,
  owner_booking_link: String,
  owner_tripAdvisor_link: String,
  owner_vrboHomeAway_link: String,
  owner_other_links:[{type: String}],
  vj_airbnb_link: String,
  vj_booking_link: String,
  vj_tripAdvisor_link: String,
  vj_vrboHomeAway_link: String,
  vj_other_links:[{type: String}],
  createdAt: Date
})

module.exports = mongoose.model('Property', propertySchema);
