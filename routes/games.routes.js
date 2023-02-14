import controllers from "../controllers/games.controllers.js"
import express from 'express'

const router = express.Router()
const { getOneGame , getGamePrice} = controllers

router.get("/:id", getOneGame)

export default router