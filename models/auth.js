const mongoose = require('mongoose');


const Auth = mongoose.model('Auth', new mongoose.Schema({
  email: String,
  loggedDate: { type: Date, default: Date.now() }
}))


module.exports = Auth