import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';

export const login = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }

  res.status(201).json({ message: 'Successfully Logged In' });
};

export const signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }
  res.status(201).json({ message: 'Successfully Siggned Up' });
};
