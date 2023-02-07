import 'dotenv/config.js'
import '../../config/database.js'
import mongoose from 'mongoose'
import { Category } from '../Categories.model.js'
import { Games } from '../Games.model.js'
import { User } from '../User.model.js'
import categories from './categories.js'
import games from './games.js'
import users from './users.js'

Category.insertMany(categories, (error) => {
    if(error) {
    console.error(error);
    } else {
    console.log('Data imported successfully');
    }})

Games.insertMany(games, (error) => {
    if(error) {
    console.error(error);
    } else {
    console.log('Games imported successfully');
    }})

User.insertMany(users, (error) => {
    if(error) {
    console.error(error);
    } else {
    console.log('Users imported successfully');
    }})


    let newGame = async(game) => {
        let category = await Category.findOne({ name: game.categories_id })
        game.categories_id = category._id
        let newGame = await Games.create(game)
        return newGame._id
    }


/* let newDoc = async(user,model,dataModel) => {
    let newUser = await User.create(user)
    dataModel.user_id = newUser._id
    let newModel = await model.create(dataModel)
    return newModel._id
}

let newCategories = async(categories) => await Category.insertMany(categories)
newCategories(categories)

let newGame = async(game) => {
    let category = await Categories.findOne({ name: game.category })
    game.categories_id = category._id
    let newgame = await game.create(game)
    return newgame._id
} */

/* import { user1,user2,user3 } from './users.js'
import { categories } from './categories.js'
import { game1,game2,game3,game4,game5,game6,game7,game8,game9,game10,game11,game12,game13,game14,game15,game16,game17,game18,game19,game20,game21,game22,game23,game24,game25,game26,game27,game28,game29,game30,game31,game32,game33,game34,game35,game36,game37,game38,game39,game40,game41,game42,game43,game44,game45,game46,game47,game48,game49,game50, } from './games.js'
import { User } from '../User.model.js' */