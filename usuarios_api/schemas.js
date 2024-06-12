const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
  nombreAdmin: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});
  module.exports = {usuarioSchema}