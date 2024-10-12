// Ruta protegida para autorizar el mensaje

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type NextFunction, type Response, type Request } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { SECRET_JWT_KEY } from '../constants/env'
import { CONFLICT, UNAUTHORIZED } from '../constants/http'
import appAssert from '../utils/appAssert'
import AppErrorCode from '../constants/appErrorCode'
import catchErrors from '../utils/catchErrors'

export const protectRoute = catchErrors(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req.cookies.access_token as string | undefined
  if (!accessToken) {
    res.status(UNAUTHORIZED).json({
      error: 'Unauthorized - No access token'
    })
    return
  }
  const data = jwt.verify(accessToken, SECRET_JWT_KEY)

  appAssert(typeof data !== 'string', UNAUTHORIZED, 'Invalid access token', AppErrorCode.InvalidAccessToken)

  const userID = data.userId
  if (!userID) {
    res.status(UNAUTHORIZED).json({
      error: 'Unauthorized - No userId in token'
    })
  }
  try {
    const user = await User.findById(userID).select('-password')

    appAssert(user, CONFLICT, 'User not found', AppErrorCode.UserNotFound)
    req.user = user

    next()
  } catch (error) {
    res.status(CONFLICT).json({
      error: 'Error in protectRoute middleware',
      message: error
    })
  }
}
)
