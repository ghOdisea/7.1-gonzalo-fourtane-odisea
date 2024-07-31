/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '../models/user.model'
import { type IRegister } from '../utils/interfaces/Register-I'
import { generateTokenAndSetCookie } from '../utils/generateToken'
import { type ILogin } from '../utils/interfaces/Login-I'
import dotenv from 'dotenv'

dotenv.config()

const salt = Number(process.env.SALT_ROUNDS)

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword }: IRegister = req.body

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' })
    }

    const user = await User.findOne({ username })

    if (user !== null) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    // TODO Profile Pic

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      password: hashedPassword
    })

    if (newUser !== null) {
      generateTokenAndSetCookie(newUser._id, res)

      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username
      })
    } else {
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error: any) {
    console.error('Error in register controller')
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: ILogin = req.body

    const user = await User.findOne({ username })

    const checkThis = String(user?.password)
    const orThis = ''
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const isValid: boolean = await bcrypt.compare(password, checkThis || orThis)

    if (user === null || !isValid) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      id: user?._id,
      username: user?.username
    } // TODO ENVIAR FOTO DE PERFIL
    )
  } catch (error: any) {
    console.log('Error in log in controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json({ message: 'Logged out succesfully' }).redirect('/')
  } catch (error: any) {
    console.log('Error in log in controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
