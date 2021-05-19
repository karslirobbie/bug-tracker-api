const Joi = require('joi')



const validUserBody = (req, res, next) => {

  const schema = Joi.object({
    name: Joi.string().required().max(55),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(22).required(),
    team: Joi.string(),
    role: Joi.string(),
    projects: Joi.array()
  })

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}


const validUserQuery = (req, res, next) => {

  const schema = Joi.object({
    name: Joi.string().max(55),
    email: Joi.string().email(),
    team: Joi.string(),
    role: Joi.string(),
    projects: Joi.array().items(Joi.string())
  })

  const { error } = schema.validate(req.query)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}



module.exports.validUserBody = validUserBody
module.exports.validUserQuery = validUserQuery