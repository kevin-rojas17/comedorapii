const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  nombreAdmin: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});
  module.exports = {userSchema}