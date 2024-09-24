/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { User } from '../models/user.model'

export const getUsersSideBar = async (req: any, res: Response) => {
  try {
    const onlineUser = req.user

    if (onlineUser === undefined) return res.status(404).json({ Error: 'user not found' })

    const onlineUserId = onlineUser.id

    const allUsersButMe = await User.find({ _id: { $ne: onlineUserId } }).select('-password')

    res.status(200).json(allUsersButMe)
  } catch (error) {
    console.error('Error in getUsers Controller')
    res.status(500).json({ error: 'Internal server error' })
  }
}
