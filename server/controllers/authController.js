const User = require("../models/usersModel");

const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

const createAndSendToken = (id, res, statusCode) => {
  const token = signToken(id);

  //Storing JWT in cookie to make user logged in for a specific browser
  const cookieOptions = {
    // maxAge: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
    maxAge: 90000,
    httpOnly: true, //cant be modified by the browser
  };

  res.cookie("jwt", `${token}`);

  res.status(statusCode).json({
    status: "success",
    token,
  });
};
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(500).json({
      status: "error",
      message: "Enter a password or email",
    });

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(500).json({
      status: "error",
      message: "No user found with that email",
    });

  if (!(await user.correctPassword(password, user.password)))
    return res.status(500).json({
      status: "error",
      message: "The passwords do not match",
    });

  createAndSendToken(user._id, res, 200);
});

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password)
    return res.status(500).json({
      status: "error",
      message: "Please enter a name , email or a password",
    });

  //confirmPass field
  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.protect = catchAsyncErrors(async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  //use cookie parser to recieve cookies as a response

  if (!token)
    return res.status(500).json({
      status: "error",
      message: "The user is not logged in ",
    });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "JWT error",
    });
  }

  const user = await User.findById(decoded.id);

  if (!user)
    return res.status(500).json({
      status: "error",
      message: "No user found , please login ",
    });

  //req.user
  req.user = user;

  next();
});

exports.getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      status: "success",
      user: req.user,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Please login",
    });
  }
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("jwt", "loggedouttoken", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.updateUserData = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;

  const toUpdate = req.body;

  const updatedData = await User.findByIdAndUpdate(id, toUpdate, { new: true });

  res.status(200).json({
    status: "Success",
    data: updatedData,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  // const user = req.user.select("+password");
  const { oldPass, newPass, confirmPass } = req.body;
  // get the user from the collection
  if (!user)
    return res.status(400).json({
      status: "error",
    });
  // check if the posted password is correct
  const isPassCorrect = await user.correctPassword(oldPass, user.password);
  if (!isPassCorrect)
    return res.status(400).json({
      status: "error",
    });
  //if pass is correct then update the password
  user.password = newPass;
  user.passwordConfirm = confirmPass;
  // user.passwordChangedAt = Date.now();
  await user.save();
  //log the user in send JWT
  createAndSendToken(req.user._id, res, 200);
});
