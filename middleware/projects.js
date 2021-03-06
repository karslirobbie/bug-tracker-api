const Joi = require("joi")


const validProjectBody = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(55),
    description: Joi.string().max(255),
    createdBy: Joi.string().required(),
    createdDate: Joi.string(),
    startedDate: Joi.string(),
    closedDate: Joi.string(),
    status: Joi.string().required().max(20),
    teams: Joi.array().items(Joi.string()),
    departments: Joi.array().required(),
  })

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}



const validProjectQuery = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(20),
    description: Joi.string().max(20),
    createdBy: Joi.string().max(20),
    startedDate: Joi.string(),
    closedDate: Joi.string(),
    status: Joi.string().max(10),
    teams: Joi.array().items(Joi.string()),
    departments: Joi.array()
  })

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}


module.exports.validProjectBody = validProjectBody
module.exports.validProjectQuery = validProjectQuery