let router = express.Router();
import express from 'express';
import passport from '../config/passport.js';
import validator from '../middlewares/validator.js';
import controller from '../controllers/favorites.controller.js';
import gameschema from '../schemas/favorites.schema.js';

const {create, read} = controller


router.post("/",  passport.authenticate("jwt", { session: false }),  validator(gameschema), create);
router.get("/",  passport.authenticate("jwt", { session: false }),   read);


export default router;