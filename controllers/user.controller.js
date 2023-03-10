import { User } from "../models/User.model.js"
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import defaultResponse from "../config/response.js" 
import jwt from 'jsonwebtoken'
import accountVerificationMail from "../config/accountVerfificationMail.js"

const controller = {
   

    signup: async (req, res, next) => {
        const user = {
            mail: req.body.mail,
            password: req.body.password,
            photo: req.body.photo,
            is_online: false,
            is_verified: false,
            verify_code: crypto.randomBytes(10).toString("hex"),
             password: bcryptjs.hashSync(req.body.password, 10),  
        };
        try {
            await accountVerificationMail(user,res)
            await User.create(user); //crea el usuari
            req.body.success = true;
            req.body.sc = 201; //agrego el codigo de estado
            req.body.data = "User created!";
            return defaultResponse(req, res);
        } catch (error) {
            next(error)
        }
    },
/*     getOneUser:  async (req, res, next) => {
        try {
            const {id} = req.params
            let one = await User.findById(id)
            if (one) {
                res.status(200).json({
                    success: true,
                    response: one,
                })
            } else {
                res.status(400).json({
                    success: false,
                response: "User not found",
            })
        }
    } catch (error) {
        next(error)
    }
}, */
    veryfy:  async(req,res,next) => {
        const  {verify_Code}  = req.params
          try {
    
           const user =  await User.findOneAndUpdate({ "verify_code" : verify_Code },{ is_verified: true })
        console.log(user)
    
            req.body.success = true
            req.body.sc = 200
            req.body.data = "User successfully verified!!!"
            return defaultResponse(req, res);
        } catch (error) {
          next(error)
        }
      },

    signin: async (req, res, next) => {
        let { password } = req.body
        let { user } = req 
        try {
            const verified = bcryptjs.compareSync(password, user.password) //comparo contrase??a
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
                req.body.data = { user ,token  }
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
            //si tiene ??xito debe cambiar online de true a false
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
   

    /* read2: async(req,res,next) => {
        try {
            const  mail = req.params
            console.log(mail)
            let oneUser = await User.findOne(mail)
            if (oneUser) {
                res.status(200).json({
                    success: true,
                    response: oneUser,
                })
            } else {
                res.status(400).json({
                    success: false,
                response: "User not found",
            })
        }
        } catch(error) {
            next(error)
        }        
    }, */
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