const mongoose = require('mongoose');
const { comedorSchema } = require('./schemas');

const comedorModel = mongoose.model('internado', comedorSchema);

module.exports = {comedorModel };