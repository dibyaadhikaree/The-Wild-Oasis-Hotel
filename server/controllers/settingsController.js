const Setting = require("../models/settingsModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

exports.getSettings = catchAsyncErrors(async (req, res, next) => {
  const data = await Setting.find();

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createSettings = catchAsyncErrors(async (req, res, next) => {
  const data = await Setting.create(req.body);

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.updateSettings = catchAsyncErrors(async (req, res, next) => {
  const data = await Setting.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data,
  });
});
