const mongoose = require('mongoose')

const Project = mongoose.model('Project', new mongoose.Schema({
  title: String,
  alias: String,
  description: String,
  dateCreated: { type: Date, default: Date.now() },
  startedDate: String,
  closedDate: String,
  status: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
}))


module.exports = Project
