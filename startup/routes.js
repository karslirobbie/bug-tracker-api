const departments = require('../routes/departments')
const projects = require('../routes/projects')
const comments = require('../routes/comments')
const tickets = require('../routes/tickets')
const error = require('../middleware/error')
const users = require('../routes/users')
const teams = require('../routes/teams')
const auth = require('../routes/auth')
const express = require('express')


module.exports = (app) => {
  app.use(express.json())
  app.use('/auth', auth)
  app.use('/users', users)
  app.use('/teams', teams)
  app.use('/tickets', tickets)
  app.use('/comments', comments)
  app.use('/projects', projects)
  app.use('/departments', departments)
  app.use(error)
}