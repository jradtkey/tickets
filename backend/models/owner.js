const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ownerSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  accountType: String,
  commission: Number,
  properties: [{type: Schema.Types.ObjectId, ref: 'Property'}],
  createdAt: Date
})

module.exports = mongoose.model('Owner', ownerSchema);
