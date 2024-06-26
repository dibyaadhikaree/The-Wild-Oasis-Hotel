const Booking = require("../models/bookingsModel");
const AppError = require("../utils/appError");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { ObjectId } = require("mongodb");

exports.getAllBookings = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.query);
  // { sortBy: 'startDate-asc', status: 'unconfirmed'  , id : cabinId}

  const filterFields = { ...req.query };

  const excludedFields = ["sortBy", "page", "limit"];
  excludedFields.forEach((el) => delete filterFields[el]);

  // query = Booking.find(filterFields).populate({
  //   path: "cabin guest",
  //   select: "-__v -_id",
  // });

  const matchObj = Object.entries(filterFields).map(([key, val]) => {
    return {
      [key]: val * 1 || val,
    };
  });

  let aggregate = Booking.aggregate([
    {
      $lookup: {
        from: "cabins",
        localField: "cabin",
        foreignField: "_id",
        as: "cabin",
      },
    },
    {
      $unwind: "$cabin",
    },
    {
      $lookup: {
        from: "guests",
        localField: "guest",
        foreignField: "_id",
        as: "guest",
      },
    },
    {
      $unwind: "$guest",
    },
    {
      $addFields: {
        totalPrice: { $subtract: ["$cabin.regularPrice", "$cabin.discount"] },
      },
    },
    { $match: { $and: matchObj.length ? matchObj : [{}] } },
  ]);

  if (req.query.sortBy) {
    const [field, direction] = req.query.sortBy.split("-");
    aggregate = aggregate.sort({
      [field]: direction,
      _id: 1,
    });
  }

  if (req.query.page) {
    const page = req.query.page * 1;
    const Page_Size = 10;
    const skip = (page - 1) * Page_Size;
    aggregate = aggregate
      .facet({
        totalCount: [{ $count: "count" }],
        bookings: [{ $skip: skip }, { $limit: Page_Size }],
      })
      .project({
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        bookings: 1,
      });
  }

  const [{ bookings = await aggregate, totalCount: count = {} }] =
    await aggregate;

  res.status(200).json({
    status: "success",
    count,
    data: bookings,
  });
});

exports.createBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = req.body;

  const newBooking = await Booking.create(booking);

  res.status(200).json({
    status: "success",
    data: newBooking,
  });
});

exports.getBooking = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  const booking = await Booking.findById(id);

  if (!booking) return next(new AppError("No booking found for the id", 404));

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

exports.getBookingByUserId = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  const booking = await Booking.find({ guest: userId });

  if (!booking) return next(new AppError("No booking found for the id", 404));

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

exports.updateBooking = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;

  const booking = await Booking.findByIdAndUpdate(id, update, { new: true });

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) return next(new AppError("No booking found for the id", 404));

  res.status(200).json({
    status: "success",
    data: booking,
  });
});
