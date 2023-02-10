import express from 'express';
import categories from './categories.route.js'
import game from './games.routes.js'
import users from './users.route.js'

import games from "./allgames.route.js"


let router = express.Router();


router.get("/", function (req, res, next) {
  res.send("minga server ready");
});

router.use("/categories", categories);

router.use('/auth',users)

router.use("/games", games);

router.use("/games", game) 


export default router
