const Joi = require("joi");

module.exports.experienceSchema = Joi.object({
  Experience: Joi.object({
    username: Joi.string().required(),
    company: Joi.string().required(),
    year: Joi.string().required(),
    experience: Joi.string().required(),
  
  }).required(),
});
