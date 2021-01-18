import express, { Application, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import { config } from './config'
import { CustomError } from './helpers/customError'
import { router } from './routers'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(err.statusCode || 500).json({
    error: err.message
  })
})

const startServer = async () => {
  try {
    await mongoose.connect(
      config.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      err => {
        if (!err) {
          console.log('> Server is connected to MongoDB')
        }
      }
    )

    app.listen(config.PORT, () => {
      console.log(
        `> Server is up and running on http://localhost:${config.PORT}`
      )
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

startServer()
