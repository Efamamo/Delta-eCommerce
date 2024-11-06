import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import {
  comparePasswords,
  hashPassword,
} from '../services/password-service.js';
import { generateToken } from '../services/jwt-services.js';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user.js';
import sendVerification from '../mails/verification.js';
import crypto from 'crypto';
const jwt = jsonwebtoken;

function refresh(token) {
  if (!token) {
    return '';
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return '';
    const accessToken = generateToken(user);
    return accessToken;
  });
}

export const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.sendStatus(401);

  const match = await comparePasswords(password, user.password);
  if (!match) return res.sendStatus(401);

  if (!user.isVerified)
    return res.status(401).json({ message: 'verify your account' });

  const token = generateToken(user);
  const refreshToken = generateToken(user);

  res.status(201).json({ accessToken: token, refreshToken: refreshToken });
};

export const signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }
  const { username, password, email } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(409).json({ error: 'Email taken' });

  user = await User.findOne({ username });
  if (user) return res.status(409).json({ error: 'Username taken' });

  const hashedPassword = await hashPassword(password);

  const otp = crypto.randomInt(100000, 999999);
  const otpExpiration = Date.now() + 10 * 60 * 1000;

  const newUser = new User({
    username,
    password: hashedPassword,
    isAdmin: false,
    email,
    otp,
    otpExpiration,
  });

  await newUser.save();

  await sendVerification(newUser);

  res.status(201).json({ message: 'Enter the OTP provided to your email' });
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const otp = crypto.randomInt(100000, 999999);
  const otpExpiration = Date.now() + 10 * 60 * 1000;

  user.otp = otp;
  user.otpExpiration = otpExpiration;

  await sendVerification(user);
  res.json({ message: 'OTP sent again' });
};

export const verifyUser = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'User not found' });
  if (user.isVerified)
    return res.status(400).json({ message: 'User already verified' });

  if (user.otp !== parseInt(otp) || Date.now() > user.otpExpiration) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiration = null;
  await user.save();

  const token = generateToken(user);
  const refreshToken = generateToken(user);

  res.status(201).json({ accessToken: token, refreshToken: refreshToken });
};

export const refreshToken = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ error: 'token is required' });
  }
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  t = refresh(token);

  if (!t) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  res.json({ accessToken: t });
};

export const verify = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ error: 'token is required' });
  }
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      const token = refresh(req.token);
      if (!token) {
        return res.sendStatus(401);
      }

      res.json({ accessToken: token });
    }
    return res.json({ accessToken: token });
  });
};
