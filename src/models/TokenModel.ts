import { model, Schema, Document, Model } from 'mongoose'

export interface IToken extends Document {
  userGuid: string
  refreshToken: string
}

export interface ITokenModel extends Model<IToken> {}

const tokenSchema = new Schema<IToken, ITokenModel>({
  userGuid: String,
  refreshToken: String
})

export const TokenModel = model('token', tokenSchema)
