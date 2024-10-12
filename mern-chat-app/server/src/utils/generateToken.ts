import { type Response } from 'express'
import jwt from 'jsonwebtoken'
import { NODE_ENV, SECRET_JWT_KEY } from '../constants/env'

export const generateTokenAndSetCookie = (userId: string, res: Response): void => {
  const accessToken = jwt.sign({ userId }, SECRET_JWT_KEY, {
    expiresIn: '1h'
  })

  res.cookie('access_token', accessToken, {
    httpOnly: true, // la cookie solo se puede acceder desde el servidor.
    secure: NODE_ENV !== 'dev', // https only,
    sameSite: 'strict', // solo se puede acceder desde el mismo dominio
    maxAge: 1000 * 60 * 60 // MS
  })
}
