const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  platform: String,
  inquiryType: String,
  guestName: {type: String, required: true},
  checkIn: String,
  checkOut: String,
  property: {type: String, required: true},
  propertyOwner: {type: String, required: true},
  accountType: String,
  platformImage: String,
  assignedTo: String,
  status: String,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  createdAt: Date
})

module.exports = mongoose.model('Ticket', ticketSchema);
