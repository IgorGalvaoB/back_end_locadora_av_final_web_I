const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [15, 'Username must be less than 15 characters'],
      minlength: [5, 'Username must be at least 5 characters'],
    },
    password: {
      type: String,
      required: true,
      trim: true, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = model('User', userSchema);
