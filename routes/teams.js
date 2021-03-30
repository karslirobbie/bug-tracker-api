const { validTeamBody, validTeamQuery } = require('../middleware/teams')
const { queryString } = require('../middleware/queries')
const { authenticate } = require('../middleware/auth')
const { validId } = require('../middleware/tickets')
const admin = require('../middleware/admin')
const { Team } = require('../models/teams')
const express = require('express');
const router = express.Router();




router.get('/', [validTeamQuery, queryString], async (req, res) => {
  const teams = await Team.find(res.locals.query)
    .populate("members", "name -_id")
    .populate("department", "name -_id")
    .select("-__v")

  res.send(teams)
})



router.get('/:id', validId, async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate("members", "name -_id")
    .populate("department", "name -_id")
    .select("-__v")

  if (!team) return res.status(404).send('Team with specified ID not found');
  res.send(team)
})



router.post('/', [validTeamBody, authenticate, admin], async (req, res) => {
  const team = new Team({
    name: req.body.name,
    members: req.body.members,
    department: req.body.department
  })

  await team.save();
  res.send(team)
})



router.put('/:id', [validId, validTeamBody, authenticate, admin], async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    members: req.body.members,
    department: req.body.department
  }, { new: true, select: "-__v" })

  if (!team) return res.status(404).send('Team with the specified ID not found.')
  res.send(team)
})



router.delete('/:id', [validId, authenticate, admin], async (req, res) => {
  const team = await Team.findByIdAndRemove(req.params.id)
  if (!team) return res.status(404).send('Team with the specified ID not found.')
  res.send(team)
})


module.exports = router