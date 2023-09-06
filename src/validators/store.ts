import Joi from 'joi'


export const storeSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  urlLogo: Joi.string()
    .min(10)
    .required(),
  address: Joi.string()
    .min(6)
    .required(),
  ownerId: Joi.number().integer().required()
})

export const editStoreSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  urlLogo: Joi.string()
    .min(10)
    .required(),
  address: Joi.string()
    .min(6)
    .required(),
})