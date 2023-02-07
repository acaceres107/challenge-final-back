import controllers from "../controllers/gameOne.controllers.js"
import express from 'express'

const router = express.Router()
const { getOneGame } = controllers

router.get("/:id", getOneGame)

export default router