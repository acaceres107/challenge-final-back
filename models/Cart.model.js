
import mongoose from 'mongoose'
import Joi from 'joi';
/* import { String } from 'joi' */



const cartschema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "users", required: false },
  _id: { type: mongoose.Types.ObjectId, ref: "games", required: false },
  title: { type: String, required: false },
  image: {type: String, required: false},
  price: { type: String, required: false },
});

 export const Cart = mongoose.model("cart", cartschema);

