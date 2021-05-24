const Joi = require("joi");


const validCommentBody = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
    parentTag: Joi.string().required(),
    createdBy: Joi.string().required(),
    dateCreated: Joi.string(),
  })

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  next()
}

module.exports.validCommentBody = validCommentBody