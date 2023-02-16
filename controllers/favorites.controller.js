import { Favorites } from '../models/Favorites.js'
import { Games } from '../models/Games.model.js'
import defaultResponse from '../config/response.js'
import mongoose from 'mongoose'


const controller = {
  create: async(req, res, next)=> {
    let data = {
      game_id : req.body.game_id,
      user_id: req.user.id
    } 
    console.log(data)
    try {
        const favoritesGames = await Favorites.findOne(data)
        if(favoritesGames){
          await Favorites.findOneAndDelete(data)
          req.body.data = "Reaction eliminated"
        }else{
          await Favorites.create(data)
          req.body.data = "Reaction added"
        }
        req.body.success = true
        req.body.sc = 200
        return defaultResponse(req,res)
      }catch(error){
        next(error)
      }
    },

      read: async (req, res, next) => {
        let user = {user_id: req.user.id}
          try {
              let favoritesReactions = await Favorites.find(user).populate("game_id" , "-category -description -trailer -developer -game_url -so -procesador -graphics -ram -video -password -is_admin -is_verified -verify_code -is_online")
                  
              if (favoritesReactions) {
                  req.body.success = true;
                  req.body.sc = 200;
                  req.body.data = favoritesReactions;
                  return defaultResponse(req, res);
              } else {
                  req.body.success = false;
                  req.body.sc = 404;
                  req.body.data = "favoritesReactions not found";
                  return defaultResponse(req, res);
              }
          } catch (error) {
              next(error);
          }
      },
  
  }

export default controller;;