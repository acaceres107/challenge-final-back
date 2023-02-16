import controller from "../controllers/oneUser.controller.js"
import express from 'express'

const router = express.Router()
const { getOneUser } = controller

router.get("/:id", getOneUser)

export default router