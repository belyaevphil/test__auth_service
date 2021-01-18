import { sign } from 'jsonwebtoken'
import { hash } from 'bcryptjs'
import { v4 as generateUuid } from 'uuid'

import { config } from '../config'
import { ITokenModel, IToken } from '../models/TokenModel'

export interface ITokenService {
  createTokens: (
    userGuid: string
  ) => Promise<{
    accessToken: string
    refreshToken: string
  }>
  findRefreshToken: (refreshToken: string) => Promise<IToken | null>
  clearRefreshToken: (refreshToken: string) => Promise<void>
}

export class TokenService implements ITokenService {
  constructor(private readonly tokenModel: ITokenModel) {}

  private createAccessToken = (userGuid: string) => {
    return sign({ userGuid }, config.ACCESS_TOKEN.SECRET, {
      algorithm: 'HS512',
      expiresIn: config.ACCESS_TOKEN.EXPIRES_IN
    })
  }

  private createRefreshToken = async (userGuid: string) => {
    const refreshToken = await hash(generateUuid(), 10)
    await this.tokenModel.create({
      userGuid,
      refreshToken
    })

    return refreshToken
  }

  public createTokens = async (userGuid: string) => {
    const accessToken = this.createAccessToken(userGuid)
    const refreshToken = await this.createRefreshToken(userGuid)

    return {
      accessToken,
      refreshToken
    }
  }

  public findRefreshToken = async (refreshToken: string) => {
    const token = await this.tokenModel.findOne({ refreshToken })

    return token
  }

  public clearRefreshToken = async (refreshToken: string) => {
    await this.tokenModel.deleteOne({ refreshToken })
  }
}
