import mercadopago from 'mercadopago'
import { Cart } from '../models/Cart.model.js'
import { Games } from '../models/Games.model.js'
import defaultResponse from '../config/response.js'
import mongoose from 'mongoose'


const controller = {
  create: async(req, res, next)=> {
    let data = {
      _id : req.body._id
      
/*             user_id : req.user._id */
    }
    console.log(data)
    try {

        console.log(data)
        const reactionCart = await Cart.findById(data)
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
          try {
              let cart = await Cart.find().populate("_id")
                  
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
  
  }

export default controller;;