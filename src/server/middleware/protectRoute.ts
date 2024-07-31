// Ruta protegida para autorizar el mensaje

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = String(process.env.SECRET_JWT_KEY)

export interface CustomRequest extends Request {
  userId?: string
}

export const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken: string = req.cookies.access_token
    if (accessToken === undefined) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    const decoded = jwt.verify(accessToken, secretKey)

    if (typeof decoded === 'string') {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }

    const userID: string = decoded.userId
    if (!userID) {
      return res.status(401).json({ error: 'Unauthorized - No userId in token' })
    }

    const user = await User.findById(userID).select('-password')

    if (user === null) {
      return res.status(401).json({ error: 'Unauthorized - User not found' })
    }
    // Asigna la data decodificada al request como userId
    req.userId = String(user._id)
    console.log(user._id)
    next()
  } catch (error) {
    console.log('Error in route protection')
    res.status(500).json({ error: 'Internal server error' })
  }
}
