import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  main_image: {
    type: String,
    required: true,
  },

  sub_images: [
    {
      type: String,
    },
  ],

  amount: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
});

export const Product = mongoose.model('Product', productSchema);
