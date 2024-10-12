/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import User from '../models/user.model'
import catchErrors from '../utils/catchErrors'

export const getUsersSideBar = catchErrors(async (req: any, res: Response) => {
  const onlineUser = req.user
  console.log('onlineUser: ', onlineUser)

  if (onlineUser === undefined) return res.status(404).json({ Error: 'user not found' })

  const onlineUserId = onlineUser.id

  const allUsersButMe = await User.find({ _id: { $ne: onlineUserId } }).select('-password')

  res.status(200).json(allUsersButMe)
  console.error('Error in getUsers Controller')
  res.status(500).json({ error: 'Internal server error' })
}
)
