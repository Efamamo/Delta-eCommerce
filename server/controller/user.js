import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import {
  comparePasswords,
  hashPassword,
} from '../services/password-service.js';
import { generateToken } from '../services/jwt-services.js';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user.js';
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

  const token = generateToken(user);
  const refreshToken = generateToken(user);

  res.status(201).json({ accessToken: token, refreshToken: refreshToken });
};

export const signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }
  const { username, password } = req.body;

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    username,
    password: hashedPassword,
    isAdmin: false,
  });

  await newUser.save();

  const token = generateToken(newUser);
  const refreshToken = generateToken(newUser);

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

  res.json({ accessToken: token });
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
