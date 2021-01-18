import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { config } from '../config'
import { CustomError } from '../helpers/customError'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) {
      throw new CustomError(401, `Token isn't provided`)
    }

    verify(accessToken, config.ACCESS_TOKEN.SECRET)

    next()
  } catch (e) {
    next(e)
  }
}
