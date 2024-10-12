/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import User from '../models/user.model'
import catchErrors from '../utils/catchErrors'

export const getUsersSideBar = catchErrors(async (req: Request, res: Response) => {
  const myUser = req.user

  if (myUser === undefined) return res.status(404).json({ Error: 'user not found' })

  const myUserID = myUser.id

  const allUsersButMe = await User.find({ _id: { $ne: myUserID } }).select('-password')

  if (allUsersButMe.length === 0) {
    return res.status(200).json([])
  }
  res.status(200).json(allUsersButMe)
}
)
