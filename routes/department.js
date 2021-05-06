const { validDepartmentBody, validDepartmentQuery } = require('../middleware/department')
const { queryString } = require('../middleware/queries')
const { authenticate } = require('../middleware/auth')
const { Department } = require('../models/department')
const { validId } = require('../middleware/tickets')
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();



router.get('/', [validDepartmentQuery, queryString], async (req, res) => {
  const departments = await Department.find(res.locals.query)
  res.send(departments)
})



router.get('/:id', validId, async (req, res) => {
  const department = await Department.findById(req.params.id)
  if (!department) return res.status(404).send('Department with specified ID not found');
  res.send(department)
})



router.post('/', [validDepartmentBody, authenticate, admin], async (req, res) => {
  const department = new Department({
    name: req.body.name,
    members: req.body.members,
    department: req.body.department
  })

  await department.save();
  res.send(department)
})



router.put('/:id', [validId, validDepartmentBody, authenticate, admin], async (req, res) => {
  const department = await Department.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    members: req.body.members,
    department: req.body.department
  }, { new: true, select: "-__v" })

  if (!department) return res.status(404).send('Department with the specified ID not found.')
  res.send(department)
})



router.delete('/:id', [validId, authenticate, admin], async (req, res) => {
  const department = await Department.findByIdAndRemove(req.params.id)
  if (!department) return res.status(404).send('Department with the specified ID not found.')
  res.send(department)
})


module.exports = router