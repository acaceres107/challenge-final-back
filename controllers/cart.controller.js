import mercadopago from 'mercadopago'
import { Cart } from '../models/Cart.model.js'
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
        const reactionCart = await Cart.findOne(data)
        if(reactionCart){
          await Cart.findOneAndDelete(data)
          req.body.data = "Game eliminated"
        }else{
          await Cart.create(data)
          req.body.data = "Game added to the cart"
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
              let cart = await Cart.find(user).populate("game_id" , "-category -description -trailer -developer -game_url -so -procesador -graphics -ram -video -password -is_admin -is_verified -verify_code -is_online -photo")
                  
              if (cart) {
                  req.body.success = true;
                  req.body.sc = 200;
                  req.body.data = cart;
                  return defaultResponse(req, res);
              } else {
                  req.body.success = false;
                  req.body.sc = 404;
                  req.body.data = "cart not found";
                  return defaultResponse(req, res);
              }
          } catch (error) {
              next(error);
          }
      },
      destroy: async (req, res, next)=> {
        let data = {
          game_id : req.body.game_id,
          user_id: req.user.id
        } 
        console.log(data)
        try {
            const reactionCart = await Cart.findOneAndDelete(data)
              req.body.data = "Game eliminated"
              req.body.success = true
              req.body.sc = 200
              return defaultResponse(req,res)
          }catch(error){
            next(error)
          }
        },
  
  }

export default controller;;