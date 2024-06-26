const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  minBookingLength: {
    type: Number,
    min: [0, "Min value must be greater than 0"],
  },
  maxBookingLength: {
    type: Number,
    min: [0, "Min value must be greater than 0"],
  },
  maxGuestsPerBooking: {
    type: Number,
    min: [0, "Min value must be greater than 0"],
  },
  breakfastPrice: {
    type: Number,
    min: [0, "Min value must be greater than 0"],
  },
});

const Setting = mongoose.model("Setting", settingsSchema);

module.exports = Setting;
