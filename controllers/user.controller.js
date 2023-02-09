import { User } from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import defaultResponse from "../config/response.js" 
import jwt from 'jsonwebtoken'

const controller = {

    signup: async (req, res, next) => {
        const user = {
            mail: req.body.mail,
            password: req.body.password,
            photo: req.body.photo,
            is_online: false,
            is_verified: true,
            verify_code: crypto.randomBytes(10).toString("hex"),
             password: bcryptjs.hashSync(req.body.password, 10),  
        };
        try {
            await User.create(user); //crea el usuari
            req.body.success = true;
            req.body.sc = 201; //agrego el codigo de estado
            req.body.data = "User created!";
            return defaultResponse(req, res);
        } catch (error) {
            next(error)
        }
    },

    signin: async (req, res, next) => {
        let { password } = req.body
        let { user } = req 
        try {
             const verified =  password
            if (verified) {
                await User.findOneAndUpdate(
                    { mail: user.mail },
                    { is_online: true },
                    { new: true}
                )
                 let token = jwt.sign(
                    { id: user.id },
                    process.env.KEY_JWT,
                    { expiresIn: 60*60*24 }
                    ) 
                user = { //protejo mas datos sensibles
                    mail: user.mail,
                    photo: user.photo,
                    is_admin: user.is_admin,
                    is_verified: user.is_verified
                }
                req.body.success = true
                req.body.sc = 200
                req.body.data = { user  ,token  }
                return defaultResponse(req,res)
            }
            req.body.success = false
                req.body.sc = 400
                req.body.data = 'invalid credentials'                
            return defaultResponse(req,res)
        } catch (error) {
            next(error) //respuesta del catch
        }
    },

    signintoken: async (req, res, next) => {
        let { user } = req
        try {
            req.body.success = true
            req.body.sc = 200
            req.body.data = { user }
            return defaultResponse(req,res)
        } catch (error) {
            next(error)
        }
    },
    signout: async (req, res, next) => {
        const { mail } = req.user
        try {
            //si tiene éxito debe cambiar online de true a false
            await User.findOneAndUpdate(
                { mail }, //parametro de busqueda
                { is_online: false }, //parametro a modificar
                { new: true } //especificacion que reemplace el documento de origen

            )
            req.body.success = true
            req.body.sc = 200
            req.body.data = 'come back soon!'
            return defaultResponse(req,res)
        } catch (error) {
            next(error)
        }
    },

    read: async(req,res,next) => {
        try {
            let all = await User.find()
            if (all) {
                req.body.success = true
                req.body.sc = 200
                req.body.data = { all }
                return defaultResponse(req,res)
            } else {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'no users yet'
                return defaultResponse(req,res)
            }            
        } catch(error) {
            next(error)
        }        
    }


}

export default controller