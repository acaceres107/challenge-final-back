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
    categories_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
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
},
{ timestamps: true }
)
export const Games= mongoose.model("games", gamesSchema) 