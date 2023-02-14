import 'dotenv/config.js'
import '../../config/database.js'
import mongoose from 'mongoose'
import { Category } from '../Categories.model.js'
import { Games } from '../Games.model.js'
import { User } from '../User.model.js'
import categories from './categories.js'
import games from './games.js'


// Category.insertMany(categories, (error) => {
//     if(error) {
//     console.error(error);
//     } else {
//     console.log('Data imported successfully');
//     }})

Games.insertMany(games, (error) => {
    if(error) {
    console.error(error);
    } else {
    console.log('Games imported successfully');
    }})

// User.insertMany(users, (error) => {
//     if(error) {
//     console.error(error);
//     } else {
//     console.log('Users imported successfully');
//     }})


    // let newGame = async(game) => {
    //     let category = await Category.findOne({ name: game.categories_id })
    //     game.categories_id = category._id
    //     let newGame = await Games.create(game)
    //     return newGame._id
    // }


