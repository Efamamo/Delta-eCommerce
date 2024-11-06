import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  otp: { type: Number },
  otpExpiration: { type: Date },
  isVerified: { type: Boolean, default: false },
});

export const User = mongoose.model('User', userSchema);
