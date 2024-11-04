import { Router } from 'express';
import { check } from 'express-validator';
import {
  addProduct,
  checkout,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controller/product.js';
import fileUpload, { uploadImages } from '../middlewares/fileUpload.js';

const productRouter = Router();

productRouter.get('/', getProducts);

productRouter.get('/:id', getProductById);

productRouter.post(
  '/',
  uploadImages,
  [
    check('name').notEmpty().withMessage('name is required'),
    check('price').notEmpty().withMessage('price is required'),
    check('price').isNumeric().withMessage('price should be a number'),
    check('amount').notEmpty().withMessage('amount is required'),
    check('amount').isNumeric().withMessage('amount should be a number'),
    check('category').notEmpty().withMessage('category is required'),
    check('description')
      .isLength({ min: 20 })
      .withMessage('minimum description length is 20'),
    check('description')
      .isLength({ max: 1000 })
      .withMessage('maximum description length is 1000'),
  ],
  addProduct
);

productRouter.patch(
  '/checkout',
  [
    check('items')
      .notEmpty()
      .withMessage('items are required')
      .isArray()
      .withMessage('items should be an array'),
    check('items.*.id').notEmpty().withMessage('Each item must have id'),
    check('items.*.amount')
      .notEmpty()
      .withMessage('Each item must have an amount')
      .isInt({ gt: 0 })
      .withMessage('Each item amount must be a positive integer'),
    check('userId').notEmpty().withMessage('userId is required'),
  ],
  checkout
);

productRouter.patch('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
