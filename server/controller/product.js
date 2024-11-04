import { validationResult } from 'express-validator';
import { formatErrors } from '../lib/utils.js';
import fs from 'fs';
import { Product } from '../models/product.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.files.image) {
        fs.unlink(req.files.image.path, (err) => {
          console.log(err);
        });
      }

      if (req.files.sub_image) {
        fs.unlink(req.files.sub_images.path, (err) => {
          console.log(err);
        });
      }
      return res.status(400).send({ errors: formatErrors(errors) });
    }

    const { name, price, amount, description, category } = req.body;

    const imageURL = req.files.image;
    if (!imageURL) {
      return res.status(400).send({
        errors: {
          image: 'image is required',
        },
      });
    }

    const newProduct = new Product({
      name,
      price,
      amount,
      description,
      category,
      main_image: imageURL[0].path,
      sub_images: imageURL.sub_images ? imageURL.sub_images[0].path : [],
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const updateData = {};
    const allowedFields = [
      'name',
      'price',
      'amount',
      'description',
      'category',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Find product by id and update with the new data
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const updateProductImages = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    const imageURL = req.files.image;
    if (!imageURL) {
      return res.status(400).send({
        errors: {
          image: 'image is required',
        },
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    product.main_image = imageURL[0].path;

    const subImageUrl = req.files.sub_images;
    if (subImageUrl) {
      product.sub_images = subImageUrl[0].path;
    }

    await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const checkout = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: formatErrors(errors) });
  }
  res.json({ message: 'Checked out to chapa' });
};
