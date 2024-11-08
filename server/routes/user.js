import { Router } from 'express';
import { check } from 'express-validator';
import {
  changePassword,
  forgotPassword,
  login,
  refreshToken,
  resendOTP,
  resetPassword,
  signup,
  verify,
  verifyUser,
} from '../controller/user.js';
import requireToken from '../middlewares/requireToken.js';

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
    check('email').notEmpty().withMessage('email cant be empty'),
    check('email').normalizeEmail().isEmail().withMessage('invalid email'),
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

userRouter.patch(
  '/verify-otp',
  [
    check('email').notEmpty().withMessage('email cant be empty'),
    check('email').normalizeEmail().isEmail().withMessage('invalid email'),
    check('otp').notEmpty().withMessage('otp is required'),
  ],
  verifyUser
);
userRouter.post(
  '/send-otp',
  [
    check('email').notEmpty().withMessage('email cant be empty'),
    check('email').normalizeEmail().isEmail().withMessage('invalid email'),
  ],
  resendOTP
);

userRouter.patch(
  '/change-password',
  requireToken,
  [
    check('oldPassword').notEmpty().withMessage('oldPassword is required.'),
    check('newPassword').notEmpty().withMessage('newPassword is required.'),
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('minimum password length is 6'),

    check('newPassword')
      .isLength({ max: 50 })
      .withMessage('maximum password lngth is 50'),
  ],
  changePassword
);

userRouter.patch(
  '/forgot-password',
  [
    check('email').notEmpty().withMessage('email cant be empty'),
    check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
  ],
  forgotPassword
);

userRouter.patch(
  '/reset-password',
  [
    check('newPassword').notEmpty().withMessage('newPassword is required.'),
    check('newPassword')
      .isLength({ min: 6 })
      .withMessage('minimum password length is 6'),
    check('newPassword')
      .isLength({ max: 50 })
      .withMessage('maximum password lngth is 50'),
  ],
  resetPassword
);

export default userRouter;
