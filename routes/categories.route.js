import controller from '../controllers/categories.controller.js';
const { read } = controller
import express from 'express';
let router = express.Router();


router.get('/',read)


export default router
