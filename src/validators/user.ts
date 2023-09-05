import Joi from 'joi'


export const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
})

export const editNameSchema = Joi.object({
  name: Joi.string()
    .min(3).required(),

})
export const editEmailSchema = Joi.object({
  email: Joi.string()
    .email().required(),

})

export const editPasswordSchema = Joi.object({
  password: Joi.string()
    .min(6).required(),

})