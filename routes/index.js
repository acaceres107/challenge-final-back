import categories from './categories.route.js'
import express from 'express'
import game from './games.route.js'

let router = express.Router();

router.get("/", function(req, res, next) {
  res.send("server ready");
});


router.use("/categories", categories);
router.use("/games", game)

export default router
