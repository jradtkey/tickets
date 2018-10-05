const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const propertySchema = mongoose.Schema({
  address: String,
  _owner: { type: string, ref: 'Owner' },
  createdAt: Date
})

module.exports = mongoose.model('Property', propertySchema);
