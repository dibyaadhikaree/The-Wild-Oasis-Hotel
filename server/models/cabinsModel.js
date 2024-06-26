const mongoose = require("mongoose");

const cabinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Cabin must have a name"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  maxCapacity: {
    type: Number,
    required: [true, "Max Capacity is required"],
  },
  regularPrice: {
    type: Number,
    required: [true, "Price is required"],
  },
  discount: Number,
  image: String,
  description: {
    type: String,
    maxlength: 1000,
  },
});

const Cabin = mongoose.model("Cabin", cabinSchema);

module.exports = Cabin;
