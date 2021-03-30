const { validCredentials } = require('../middleware/auth')
const { User } = require('../models/users')
const Auth = require('../models/auth')
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();


router.post('/', validCredentials, async (req, res) => {

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status('404').send('Incorrect username or password.')

  const result = bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status('404').send('Incorrect username or password')

  const auth = new Auth({
    email: req.body.email,
  })

  await auth.save()
  const token = user.generateToken()
  res.send(token)

})

module.exports = router