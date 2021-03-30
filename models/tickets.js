const mongoose = require('mongoose')
const { departmentSchema } = require('../models/department')



const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  comments: [String],
  type: String,
  status: String,
  dateCreated: { type: Date, default: Date.now() },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
})

const Ticket = mongoose.model('Ticket', ticketSchema)


module.exports.Ticket = Ticket
module.exports.ticketSchema = ticketSchema
