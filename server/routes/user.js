import { Router } from 'express';
import { check } from 'express-validator';
import { login, refreshToken, signup, verify } from '../controller/user.js';

const userRouter = Router();

userRouter.post(
  '/login',
  [
    check('username').notEmpty().withMessage("username can't be empty"),
    check('password').notEmpty().withMessage("password can't be empty"),
  ],
  login
);

userRouter.post(
  '/signup',
  [
    check('username').notEmpty().withMessage('username cant be empty'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('minimum password length is 6'),
    check('password')
      .isLength({ max: 50 })
      .withMessage('maximum password lngth is 50'),
  ],
  signup
);

userRouter.post(
  '/verify',
  check('token').notEmpty().withMessage('token is required'),
  verify
);
userRouter.post(
  '/refresh',
  check('token').notEmpty().withMessage('token is required'),
  refreshToken
);

export default userRouter;
