
import mongoose from 'mongoose'
import Joi from 'joi';
/* import { String } from 'joi' */



const cartschema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  game_id: { type: mongoose.Types.ObjectId, ref: "games", required: true },

});

 export const Cart = mongoose.model("cart", cartschema);

