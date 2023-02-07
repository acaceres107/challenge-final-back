import express from 'express'
import game from './games.route.js'

const router = express.Router();

router.get("/", function(req, res, next) {
  res.send("server ready");
});

router.use("/game", game )

export default router
