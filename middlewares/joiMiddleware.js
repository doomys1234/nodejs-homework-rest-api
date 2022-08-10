const Joi = require("joi");
 
module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  phone: Joi.string().alphanum().min(3).max(30).required(),
    favorite: Joi.boolean(),
    }) 
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({message: validationResult.error.details[0].message,})
    }
    next()
  },
  addStatusValidation: (req, res, next) => {
    const statusSchema = Joi.object({
      favorite: Joi.boolean()
      .required()
    })
    const validationResult = statusSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({message: validationResult.error.details[0].message,})
    }
    next()
  }
}