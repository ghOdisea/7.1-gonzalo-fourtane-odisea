// Ruta protegida para autorizar el mensaje

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config'
import { User } from '../models/user.model'
import type mongoose from 'mongoose'

export interface CustomRequest extends Request {
  userId?: mongoose.Types.ObjectId
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: string | undefined = req.cookies.jwt
    if (accessToken === undefined) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    const decoded = jwt.verify(accessToken, SECRET_JWT_KEY)

    if (typeof decoded === 'string') {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }

    const userId = decoded.userId
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - No userId in token' })
    }

    const user = await User.findById(userId).select('-password')

    if (user === null) {
      return res.status(401).json({ error: 'Unauthorized - User not found' })
    }
    // Asigna el token decodificado al request como JwtPayload
    (req as CustomRequest).userId = decoded.userId

    next()
  } catch (error) {
    console.log('Error in route protection')
    res.status(500).json({ error: 'Internal server error' })
  }
}
