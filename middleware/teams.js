const Joi = require("joi");


const validTeamBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    members: Joi.array().required(),
    date: Joi.string(),
    department: Joi.string().required()
  })

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}


const validTeamQuery = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    members: Joi.array(),
    date: Joi.string(),
    department: Joi.string()
  })

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}



module.exports.validTeamQuery = validTeamQuery
module.exports.validTeamBody = validTeamBody