const { validUserBody, validUserQuery } = require('../middleware/users')
const { queryString } = require('../middleware/queries')
const { authenticate } = require('../middleware/auth')
const { validId } = require('../middleware/tickets')
const admin = require('../middleware/admin')
const { User } = require('../models/users')
const _pick = require('lodash/pick');
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();




router.get('/', [validUserQuery, queryString], async (req, res) => {
  const users = await User.find(res.locals.query)
    .populate("team", "name -_id")
    .populate("projects", "title -_id")
    .select('-__v -password')
  res.send(users)
})



router.get('/:id', validId, async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("team", "name -_id")
    .populate("projects", "title -_id")
    .select('-__v -password');

  if (!user) return res.status(404).send('No user found with the given ID');
  res.send(user)
})



router.post('/', validUserBody, async (req, res) => {
  const { name, email, password, team, roles, projects } = req.body
  const hash = await hashPassword(password)

  const existingUser = await User.findOne({ email })
  if (existingUser) return res.status(400).send('User already exists.');

  const user = new User({
    name, email, password: hash, team, roles, projects
  })

  await user.save()
  const token = user.generateToken();
  res.header('x-auth-token', token).send(_pick(user, ["name", "email", "team", "roles", "projects"]));
})



router.put('/:id', [validId, validUserBody, authenticate], async (req, res) => {
  const { name, email, password, team, roles, projects } = req.body
  const hash = await hashPassword(password)

  const user = await User.findByIdAndUpdate(req.params.id, {
    name, email, password: hash,
    team, roles, projects
  }, { new: true, select: '-__v' })

  if (!user) return res.status(404).send('No User found with the given ID');
  res.send(_pick(user, ["name", "email", "team", "roles", "projects"]))
})



router.delete('/:id', [validId, authenticate, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('No user found with the given ID');
  res.send(_pick(user, ["name", "email", "team", "roles", "projects"]))
})



const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds)
  return hash;
}


module.exports = router