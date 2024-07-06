/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { type CustomRequest } from '../middleware/protectRoute'
import { User } from '../models/user.model'

export const getUsersSideBar = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInId = req.userId

    const allUsersButMe = await User.find({ _id: { $ne: loggedInId } }).select('-password')

    res.status(200).json(allUsersButMe)
  } catch (error) {
    console.error('Error in getUsers Controller')
    res.status(500).json({ error: 'Internal server error' })
  }
}
