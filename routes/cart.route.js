
/* const isTheSameUser = require ("../middlewares/isTheSameUser"); */

//-------------------------
let router = express.Router();
import express from 'express';
import passport from '../config/passport.js';
import validator from '../middlewares/validator.js';
import controller from '../controllers/cart.controller.js';
import gameschema from '../schemas/cart.schema.js';

const {create, read, pay, remove, empty, update} = controller


router.post("/", /* passport.authenticate("jwt", { session: false }), */ validator(gameschema), create);
router.get("/", /* passport.authenticate("jwt", { session: false }), */  read);
/* router.put("/:user_id", update) */
//router.get("/", /* passport.authenticate("jwt", { session: false }) , */read);
//router.get("/pay", /* passport.authenticate("jwt", {session: false}), */ pay);
//router.delete("/", /* passport.authenticate("jwt", {session: false}), */ remove)
//router.delete("/:id", /* passport.authenticate("jwt", {session: false}), */ /* isTheSameUser(Cart) */ empty);

export default router;