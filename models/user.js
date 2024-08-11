const mongoose = require("mongoose");

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

  addresses: [
    {
      name: String,
      street: String,
      suburb: String,
      province: String,
      country: String,
      postalCode: {
        type: String,
        match: [/^\d{4}$/, 'Please fill a valid 4-digit postal code']
      }
    },
  ],
  deliveries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
