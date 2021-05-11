const { validId, validTicketBody, validTicketQuery } = require('../middleware/tickets')
const { queryString } = require('../middleware/queries')
const { authenticate } = require('../middleware/auth')
const { Ticket } = require('../models/tickets');
const Project = require('../models/projects');
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();



router.get('/', [validTicketQuery, queryString], async (req, res) => {
  const tickets = await Ticket.find(res.locals.query)
    .populate("assignedTo", "name -_id")
    .populate("assignee", "name -_id")
    .populate("createdBy", "name -_id")
    .populate("project", "title team department -_id")
    .populate({
      path: 'project',
      populate: {
        path: 'team'
      }
    })
    .select("-__v")
    .sort({ title: 'asc' })

  res.send(tickets);
})



router.get('/:id', validId, async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate("assignedTo", "name -_id")
    .populate("assignee", "name -_id")
    .populate("createdBy", "name -_id")

    .populate({
      path: 'project',
      populate: {
        path: 'team',
        select: 'name -_id'
      },
    })
    .populate({
      path: 'project',
      populate: {
        path: 'department',
        select: 'name -_id'
      },
    })
    .populate("project", "title status startedDate")
    .select("-__v")

  if (!ticket) return res.status(404).send('Tickets with the specified ID not found.');
  res.send(ticket);
})



router.post('/', [validTicketBody, authenticate], async (req, res) => {
  const random = Math.floor((Math.random() * 1000) + 1);
  const tag = `${req.body.tag}-${random}`

  const ticket = new Ticket({
    tag,                      /** tag from project alias **/
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    assignee: req.body.assignee,
    status: req.body.status,
    assignedTo: req.body.assignedTo,
    createdBy: req.body.createdBy,
    project: req.body.project,
    urgency: req.body.urgency,
    attachments: req.body.attachments
  })

  await ticket.save()
  res.send(ticket)
})



router.put('/:id', [validId, validTicketBody, authenticate], async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      assignee: req.body.assignee,
      status: req.body.status,
      assignedTo: req.body.assignedTo,
      createdBy: req.body.createdBy,
      project: req.body.project,
      urgency: req.body.urgency,
      attachments: req.body.attachments
    }, { new: true, select: "-__v" })


    if (!ticket) return res.status(404).send('Ticket with the specified ID not found.');
    res.send(ticket)

  } catch (exc) {
    res.status(500).send(`Something went wrong.\n\n ${exc} `)
  }

})



router.delete('/:id', [validId, authenticate, admin], async (req, res) => {
  const ticket = await Ticket.findByIdAndRemove(req.params.id, { select: "-__v" })

  if (!ticket) return res.status(404).send('Ticket with the specified ID not found');
  res.send(ticket)

})



module.exports = router