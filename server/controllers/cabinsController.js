const Cabin = require("../models/cabinsModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

exports.getCabin = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  const data = await Cabin.findById(id);

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getCabins = catchAsyncErrors(async (req, res, next) => {
  const cabins = await Cabin.find();

  res.status(200).json({
    status: "success",
    data: cabins,
  });
});

exports.createCabin = catchAsyncErrors(async (req, res, next) => {
  const newCabin = await Cabin.create({ ...req.body });

  res.status(200).json({
    status: "Success",
    data: newCabin,
  });
});

exports.deleteCabin = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  const cabin = await Cabin.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    data: cabin,
  });
});

exports.editCabin = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  const cabin = await Cabin.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: "success",
    data: cabin,
  });
});
