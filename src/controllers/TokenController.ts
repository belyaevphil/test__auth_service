import { NextFunction, Request, Response } from 'express'

import { CustomError } from '../helpers/customError'
import { ITokenService } from '../services/TokenService'

export interface ITokenController {
  getTokens: (req: Request, res: Response, next: NextFunction) => Promise<void>
  refreshTokens: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
}

export class TokenController implements ITokenController {
  constructor(private readonly tokenService: ITokenService) {}

  public getTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userGuid = req.params.guid

      const tokens = await this.tokenService.createTokens(userGuid)

      res.status(201).json(tokens)
    } catch (e) {
      next(e)
    }
  }

  public refreshTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken = req.params.refreshToken

      const refreshTokenFromDb = await this.tokenService.findRefreshToken(
        refreshToken
      )
      if (!refreshTokenFromDb) {
        throw new CustomError(404, `Refresh token is invalid`)
      }

      await this.tokenService.clearRefreshToken(refreshToken)

      const tokens = await this.tokenService.createTokens(
        refreshTokenFromDb.userGuid
      )

      res.status(201).json(tokens)
    } catch (e) {
      next(e)
    }
  }
}
