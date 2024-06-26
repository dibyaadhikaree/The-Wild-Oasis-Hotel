const mongoose = require("mongoose");

// booking  = guest renting a cabin
// i.e connecting cabin with guest

const Cabin = require("./cabinsModel");
const Guest = require("./guestsModel");

const bookingSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
    },
    numNights: {
      type: Number,
    },
    numGuests: {
      type: Number,
    },
    cabinPrice: {
      type: Number,
    },
    extrasPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["checkedIn", "checkedOut", "unconfirmed"],
      default: "unconfirmed",
    },
    hasBreakfast: Boolean,
    isPaid: Boolean,
    observations: String,
    cabin: {
      type: mongoose.Schema.ObjectId,
      ref: "Cabin",
    },
    guest: {
      type: mongoose.Schema.ObjectId,
      ref: "Guest",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

bookingSchema.virtual("totalPrice").get(function () {
  // this.status = Date.now() - this.endDate < 0 ? "unconfirmed" : "checkedOut";
  // this.save();

  return this.cabin.regularPrice - this.cabin.discount;
});

bookingSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "cabin guest",
    select: "_id -_v",
  });
  next();
});

// const obj = {
//   startDate: Date.now(),
//   endDate: Date.now(),
//   numNights: 4,
//   numGuests: 2,
//   cabinPrice: 300,
//   extrasPrice: 120,
//   totalPrice: 420,
//   status: "unconfirmed",
//   hasBreakfast: true,
//   isPaid: true,
//   observations: "Arrival at 10",
//   cabin: 1,
//   guest: 1,
// };

//  "startDate": "Date.now()",
// "endDate": "Date.now()",
// "numNights": 4,
// "numGuests": 2,
// "cabinPrice": 300,
// "extrasPrice": 120,
// "totalPrice": 420,
// "status": "unconfirmed",
// "hasBreakfast": true,
// "isPaid": true,
// "observations": "Arrival at 10",

// "cabin": {
//   "$oid": "663a50583841f356d8dad8f6"
// },
//  "guest":{ "$oid": "663a51a2dd32c7fa63c604f9"}

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
