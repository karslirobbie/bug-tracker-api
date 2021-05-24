const Joi = require("joi");


const validDepartmentBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    date: Joi.string(),
  })

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}


const validDepartmentQuery = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    date: Joi.string(),
  })

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}



module.exports.validDepartmentQuery = validDepartmentQuery
module.exports.validDepartmentBody = validDepartmentBody