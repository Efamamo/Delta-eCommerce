import { Router } from 'express';
import { check } from 'express-validator';
import { login, signup } from '../controller/user.js';

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

export default userRouter;
