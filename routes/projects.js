const { validProjectQuery, validProjectBody } = require('../middleware/projects')
const { queryString } = require('../middleware/queries')
const { authenticate } = require('../middleware/auth')
const { validId } = require('../middleware/tickets')
const Project = require('../models/projects')
const express = require('express');
const router = express.Router()



router.get('/', [validProjectQuery, queryString], async (req, res) => {
  const projects = await Project.find(res.locals.query)
    .populate("createdBy", "name")
    .populate("teams", "name -_id")
    .populate("departments", "name -_id")
    .select("-__v")
    .sort();
  res.send(projects)
})



router.get('/:id', validId, async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("createdBy", "name")
    .populate("teams", "name -_id")
    .populate("departments", "name -_id")
    .select("-__v");
  if (!project) return res.status(404).send('Project with the given ID not found.');
  res.send(project)
})



router.post('/', [validProjectBody, authenticate], async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.body.createdBy,
    createdDate: req.body.createdDate,
    startedDate: req.body.startedDate,
    closedDate: req.body.closedDate,
    status: req.body.status,
    teams: req.body.teams,
    departments: req.body.departments
  })

  await project.save()
  res.send(project)
})



router.put('/:id', [validId, validProjectBody, authenticate], async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    createdBy: req.body.createdBy,
    createdDate: req.body.createdDate,
    startedDate: req.body.startedDate,
    closedDate: req.body.closedDate,
    status: req.body.status,
    teams: req.body.teams,
    departments: req.body.departments
  }, { new: true, select: "-__v" })

  if (!project) return res.status(404).send('Project with the specified ID not found.');
  res.send(project)
})



router.delete('/:id', [validId, authenticate], async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id, { select: "-__v" });

  if (!project) return res.status(404).send('Project with the specified ID not found.')
  res.send(project)
})



module.exports = router