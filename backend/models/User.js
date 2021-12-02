const mongoose = require("mongoose");
const { isEmail, isAlpha } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    // in validate - val is the email the user has supplied.
    validate: [isEmail, "Please enter a valid email"],
  },
  displayName: {
    type: String,
    required: [true, "Please enter a display name"],
    validate: [isAlpha, "Please enter a valid Display Name"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Minimum password length is 8 characters"],
  },
});

// Fire function before document saved to DB
userSchema.pre("save", async function (next) {
  // generating a salt through bcrypt
  const salt = await bcrypt.genSalt();
  // 'this' refers to the local instance of the User
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Creating the static method to login the user
userSchema.statics.login = async function (email, password) {
  // 'this' refers to the user model, not an instance
  //// findOne is a built in mongoose function for finding a document based on a condition, not via ID.
  const user = await this.findOne({ email });

  // if we have a user, we want to compare passwords
  if (user) {
    // comparing the password entered here with the hashed user password.
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      // returning the user as if auth is true, bcrypt compare was successful.
      return user;
    }
    // password will not be right, but user exists, so throw password error.
    throw Error("Incorrect password");
  }
  // email is not right as a user was not found.
  throw Error("Incorrect email");
};

// the Mongoose.model name should be the singular of whatever we define our DB collection to be called.
const User = mongoose.model("user", userSchema);

module.exports = User;
