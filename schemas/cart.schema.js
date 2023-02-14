import Joi from "joi-oid"


const schema = Joi.object({
  _id: Joi.any().valid().required().messages({
    "any.required": "The field '_id' is required, please enter it",
  }),
  /* price: Joi.required() *//* ,S
  quantity: joi.number().integer().min(1).required().messages({
    "any.required": "The field 'quantity' is required, please enter it",
    "number.base": "The field 'quantity' must be a integer number, please change it",
    "number.empty": "The field 'quantity' mustn't be empty, please fill it",
    "number.min": "The field 'quantity' must be 1 or greater, please enter  a valid number"
  })   */
})


export default schema;