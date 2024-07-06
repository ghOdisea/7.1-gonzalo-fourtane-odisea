/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { protectRoute } from '../middleware/protectRoute'
import { getUsersSideBar } from '../controllers/user.controller'

const router = express.Router()

router.get('/sidebar', protectRoute, getUsersSideBar)

export default router
