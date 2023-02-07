import express from 'express';
import categories from './categories.route.js'

let router = express.Router();


router.get("/", function (req, res, next) {
  res.send("minga server ready");
});

router.use("/categories", categories);

export default router
