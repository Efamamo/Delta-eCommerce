import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import fs from 'fs';

export const getProducts = (req, res) => {
  res.json([]);
};

export const getProductById = (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Shoes',
    prce: 20,
    amount: 5,
  });
};

export const addProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files) {
      fs.unlink(req.files.image, (err) => {
        console.log(err);
      });
      fs.unlink(req.files.sub_images, (err) => {
        console.log(err);
      });
    }
    return res.status(400).send({ errors: formatErrors(errors) });
  }

  const imageURL = req.files;
  if (!imageURL) {
    return res.status(400).send({
      errors: {
        image: 'image is required',
      },
    });
  }
  console.log(imageURL.image.path);

  res.status(201).json({ message: 'Successfully added a product' });
};

export const deleteProduct = (req, res) => {
  const id = req.params.id;
  res.json({ message: `Deleted Product with id ${id}` });
};

export const updateProduct = (req, res) => {
  const id = req.params.id;
  res.json({ message: `Updated Product with id ${id}` });
};

export const checkout = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }
  res.json({ message: 'Checked out to chapa' });
};
