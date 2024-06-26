const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");

//Cookie Parser: to recieve cookies in req.cookie
app.use(cookieParser());

//Body Parser
app.use(express.json());

const bookingsRouter = require("./routes/bookingRoutes");
const cabinsRouter = require("./routes/cabinRoutes");
const settingsRouter = require("./routes/settingRoutes");
const userRouter = require("./routes/userRoutes");
const guestRouter = require("./routes/guestRoutes");

const errorHandlingMiddleware = require("./controllers/errorController");
const AppError = require("./utils/appError");
//Routers

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests from this origin
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use("/api/bookings", bookingsRouter);
app.use("/api/cabins", cabinsRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/users", userRouter);
app.use("/api/guests", guestRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(`No route found for ${req.originalUrl}`, 500);
  next(err);
});

app.use(errorHandlingMiddleware);

module.exports = app;
