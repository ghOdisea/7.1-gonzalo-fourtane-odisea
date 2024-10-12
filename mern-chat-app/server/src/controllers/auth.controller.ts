import { type Request, type Response } from 'express'
import User from '../models/user.model'
import appAssert from '../utils/appAssert'
import catchErrors from '../utils/catchErrors'
import { type ILogin } from '../utils/interfaces/Login-I'
import { type IRegister } from '../utils/interfaces/Register-I'
import { generateTokenAndSetCookie } from '../utils/generateToken'
import AppErrorCode from '../constants/appErrorCode'
import { BAD_REQUEST, CONFLICT, CREATED, OK } from '../constants/http'

export const register = catchErrors(async (req: Request, res: Response) => {
  const { username, password, confirmPassword }: IRegister = req.body
  if (password !== confirmPassword) {
    return res.status(CONFLICT).json({
      message: 'Passwords do not match'
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser !== null) {
    return res.status(CONFLICT).json({
      message: 'User already exists'
    })
  }
  // TODO Profile Pic

  const newUser = await User.create({
    username,
    password
  })

  appAssert(
    newUser,
    BAD_REQUEST,
    'Invalid user data',
    AppErrorCode.InvalidUserData
  )

  generateTokenAndSetCookie(String(newUser._id), res)

  await newUser.save()

  console.log('newUser: ', newUser)
  return res.status(CREATED).json({
    message: 'User registered successfully',
    User: newUser.omitPassword()
  })
})

export const login = catchErrors(async (req: Request, res: Response) => {
  const { username, password }: ILogin = req.body

  const registeredUser = await User.findOne({ username })
  if (registeredUser === null) {
    return res.status(BAD_REQUEST).json({
      message: 'Invalid username or password'
    })
  }

  const isValid = await registeredUser.comparePassword(password)

  if (!isValid) {
    return res.status(BAD_REQUEST).json({
      message: 'Invalid username or password'
    })
  }

  const userId = String(registeredUser._id)

  generateTokenAndSetCookie(userId, res)

  return res.status(OK).json({
    message: 'Logged in successfully',
    id: userId,
    username
    // TODO ENVIAR FOTO DE PERFIL
  }
  )
})

export const logout = catchErrors(async (_: Request, res: Response) => {
  res.clearCookie('access_token')
  res.status(OK).json({ message: 'Logged out succesfully' })
})
