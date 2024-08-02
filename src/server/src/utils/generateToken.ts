/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import jwt from 'jsonwebtoken'
import type mongoose from 'mongoose'

const SecretKey = String(process.env.SECRET_JWT_KEY)
const NodeEnv = process.env.NODE_ENV

export const generateTokenAndSetCookie = (userId: string, res: any) => {
  

  const accessToken = jwt.sign({ userId }, SecretKey, {
    expiresIn: '1h'
  })

  res.cookie('access_token', accessToken, {
    httpOnly: true, // la cookie solo se puede acceder desde el servidor.
    secure: NodeEnv !== 'dev', // https only,
    sameSite: 'strict', // solo se puede acceder desde el mismo dominio
    maxAge: 1000 * 60 * 60 // MS
  })
}
