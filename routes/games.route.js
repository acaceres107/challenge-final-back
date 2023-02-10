import controllers from "../controllers/game.controllers.js"
import express from 'express'

const router = express.Router()
const { getOneGame , getGamePrice} = controllers

router.get("/:id", getOneGame)
router.get("/", getOneGame)

export default router
