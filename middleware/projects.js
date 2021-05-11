const Joi = require("joi")


const validProjectBody = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(55),
    alias: Joi.string().required().max(6),
    description: Joi.string().max(255),
    createdBy: Joi.string().required(),
    startedDate: Joi.string(),
    closedDate: Joi.string(),
    status: Joi.string().required().max(20),
    team: Joi.string(),
    department: Joi.string().required(),
  })

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}



const validProjectQuery = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(20),
    alias: Joi.string().max(6),
    description: Joi.string().max(20),
    dateCreated: Joi.string(),
    createdBy: Joi.string().max(20),
    startedDate: Joi.string(),
    closedDate: Joi.string(),
    status: Joi.string().max(10),
    team: Joi.string(),
    department: Joi.string()
  })

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}


module.exports.validProjectBody = validProjectBody
module.exports.validProjectQuery = validProjectQuery