const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi');


const validCredentials = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(55)
  })

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}


const authenticate = (req, res, next) => {

  if (!config.get("requireToken")) return next()

  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Token is required.')

  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));
    req.header.user = decoded;

    next();
  } catch (ex) {
    res.status(401).send(ex)
  }
}

module.exports.validCredentials = validCredentials
module.exports.authenticate = authenticate