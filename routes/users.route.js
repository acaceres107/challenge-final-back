import express from 'express'
let router = express.Router()
import schema from '../schemas/signup.schemas.js'
import validator from '../middlewares/validator.js'
import accountExistsSignIn from '../middlewares/accountExistsSignIn.js'
import accountExistsSignUp from '../middlewares/accountExistsSignUp.js'
/* import accountHasBeenVerified from '../middlewares/accountHasBeenVerified.js'  */
import passport from '../config/passport.js'
import mustSignIn from '../middlewares/mustSignIn.js'


import controller from '../controllers/user.controller.js'

const { signup, signin, signout, read, signintoken } = controller


router.post('/signup', accountExistsSignUp, validator(schema), signup)
router.post('/signin',  accountExistsSignIn,  /* accountHasBeenVerified, */ signin)
router.post('/token',passport.authenticate('jwt', {session: false}),mustSignIn,signintoken)
router.post ('/signout', passport.authenticate('jwt', { session:false }), signout)
router.get('/', read)

export default router