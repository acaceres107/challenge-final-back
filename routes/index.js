import express from 'express';
import categories from './categories.route.js'
import game from './games.routes.js'
import users from './users.route.js'
import cart from './cart.route.js'
import oneUser from "./oneUser.route.js"

import games from "./allgames.route.js"
//Falta agregar la ruta de mercadopago



let router = express.Router();


router.get("/", function (req, res, next) {
  res.send("nebula server ready");
});

router.use("/categories", categories);

router.use('/auth',users)

router.use("/games", games);

router.use("/games", game) 

/* router.use('/auth', oneUser) */

router.use('/carts', cart)

export default router
