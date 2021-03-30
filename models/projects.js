const mongoose = require('mongoose')

const Project = mongoose.model('Project', new mongoose.Schema({
  title: String,
  description: String,
  createdDate: { type: Date, default: Date.now() },
  startedDate: String,
  closedDate: String,
  status: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
}))


module.exports = Project