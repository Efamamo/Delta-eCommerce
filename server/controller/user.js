import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import { hashPassword } from '../services/password-service.js';
import { generateToken } from '../services/jwt-services.js';
import { v4 } from 'uuid';
import jsonwebtoken from 'jsonwebtoken';
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

  const user = {
    _id: v4(),
    username: username,
    isAdmin: false,
  };

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
  console.log(hashedPassword);

  const user = {
    _id: v4(),
    username: username,
    isAdmin: false,
  };

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
