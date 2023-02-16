import Joi from "joi-oid"


const schema = Joi.object({
  game_id: Joi.any().valid().required().messages({
    "any.required": "The field 'game_id' is required, please enter it",
  }),
})


export default schema;