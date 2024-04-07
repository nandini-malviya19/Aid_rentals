
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  rentalPrice: {
    type: String,
    required: true,
  },
  life: {
    type: String,
  },
  isRented: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    required: true,
  }],
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },

  rating: { type: String, enum: ["1", "2", "3", "4", "5"], default: '3' },
  image: [{ type: String }],

},
  { timestamps: true }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = { Inventory };
