const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now() },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
})

const Team = mongoose.model('Team', teamSchema)


module.exports.Team = Team
module.exports.teamSchema = teamSchema