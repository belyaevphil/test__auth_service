import { Router, Request, Response } from 'express'

import {
  TokenController,
  ITokenController
} from '../controllers/TokenController'
import { checkAuth } from '../middlewares/checkAuth'
import { TokenModel } from '../models/TokenModel'
import { TokenService } from '../services/TokenService'

const router = Router()

const tokenController: ITokenController = new TokenController(
  new TokenService(TokenModel)
)

router.get('/getTokens/:guid', tokenController.getTokens)
router.get('/refreshTokens/:refreshToken', tokenController.refreshTokens)

router.get('/getSensitiveData', checkAuth, (req: Request, res: Response) => {
  res.json({
    message: 'Some sensitive data'
  })
})

export { router }
