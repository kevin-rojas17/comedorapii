const mongoose = require('mongoose');
const comedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apeliido: {
    type: String,
    required: true
  },
  numeroTelefono: {
    type: Number,
    required: true
  },
  nombreAdmin:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  });
  module.exports = {comedorSchema}