const Guest = require("../models/guestsModel");

const catchAsyncErrors = require("../utils/catchAsyncErrors");

exports.getUserFromEmail = catchAsyncErrors(async (req, res, next) => {
  const email = req.params.email;

  const data = await Guest.findOne({ email });

  res.status(200).json({
    status: "success",
    data,
  });
});
exports.createGuest = catchAsyncErrors(async (req, res, next) => {
  const user = req.body;

  const data = await Guest.create(user);

  res.status(200).json({
    status: "success",
    data,
  });
});
exports.updateGuest = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  const data = await Guest.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    status: "success",
    data,
  });
});
