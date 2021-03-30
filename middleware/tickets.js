const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)



const validId = (req, res, next) => {
  const schema = Joi.objectId();
  const { error } = schema.validate(req.params.id)
  if (error) return res.status(400).send('Not a valid ID.')
  next()
}



const validTicketBody = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(55),
    description: Joi.string().max(255),
    comments: Joi.array().items(Joi.string().max(255)),
    type: Joi.string().required().max(20),
    assignee: Joi.string().required(),
    status: Joi.string().required().max(20),
    assignedTo: Joi.string(),
    createdBy: Joi.string().required(),
    project: Joi.string().required().max(155)
  })

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}



const validTicketQuery = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(20),
    description: Joi.string().max(20),
    dateCreated: Joi.string(),
    type: Joi.string(),
    assignee: Joi.string(),
    status: Joi.string(),
    assignedTo: Joi.string(),
    createdBy: Joi.string(),
    project: Joi.string(),
  })

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}



module.exports.validId = validId
module.exports.validTicketBody = validTicketBody
module.exports.validTicketQuery = validTicketQuery