const mongoose = require('mongoose');
const { userSchema } = require('./schemas');

const userModel = mongoose.model('usuario', userSchema);

module.exports = {userModel};