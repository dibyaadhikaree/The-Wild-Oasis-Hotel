const mongoose = require("mongoose");

const validator = require("email-validator");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A name is required"],
  },

  email: {
    type: String,
    required: [true, "An email is required"],
    validate: {
      validator: function (val) {
        return validator.validate(val);
      },
      message: "Please enter a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "A password is required"],
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
    required: [true, "Please confirm the password"],
    select: false,
  },
  profileImage: {
    type: String,
  },
});

//Hashing middleware :
userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;

  this.confirmPassword = undefined;

  next();
});

//Instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
