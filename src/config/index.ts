import dotenv from 'dotenv'

dotenv.config()

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '',
  DB_URI: process.env.DB_URI || '',
  ACCESS_TOKEN: {
    SECRET: process.env.ACCESS_TOKEN_SECRET || '',
    EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || ''
  }
}
