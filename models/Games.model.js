import mongoose from "mongoose"

const gamesSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
      image: {
        type: String,
        required: true,
    },

    trailer: {
        type: Array,
        required: true,
    },
    developer: {
        type: String,
        required: true,
    },
    game_url: {
        type: String,
        required: false,
    },
    so:{
         type: String,
         required: false,
    },
     procesador:{
             type: String,
         required: false,
     },
      graphics:{
         type: String,
        required: false,
      },
      ram:{
         type: String,
         required: false,
      }
    }
,
{ timestamps: true }
)
export const Games= mongoose.model("games", gamesSchema) 