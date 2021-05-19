const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String },
  role: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]
})

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id, email: this.email, role: this.role }, config.get('jwtToken'))
}

const User = mongoose.model('User', userSchema)

module.exports.User = User;
module.exports.userSchema = userSchema