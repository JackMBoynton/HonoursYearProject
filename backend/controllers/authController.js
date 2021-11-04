const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv/config");

// Error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // Incorrect email address
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  // Incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "That password is not correct";
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }

  // Validation errors
  //// Our Mongoose error message will always include 'user validation failed' so we check for this
  if (err.message.includes("user validation failed")) {
    // convert the err object into an array and then take the errors part and cycle through each error
    // via destructuring we take the properties part of each error we receive from Mongoose
    Object.values(err.errors).forEach(({ properties }) => {
      // properties.path contains where the error comes from, i.e. email or password
      // we have both in our error object, so we just set that value to whatever message comes from Mongoose
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// 3 days in seconds, 3 days x 24 hours x 60 minutes x 60 seconds
const maxAge = 3 * 24 * 60 * 60;

// this function creates and returns a JWT from the id passed - the id passed in will come from the user inside the db.
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signupPost = async (req, res) => {
  // Destructuring the email and password from request body
  const { email, password } = req.body;

  try {
    // Creating the new user locally in the DB - async task (mongoose create task)
    const user = await User.create({ email, password });
    // Log the user in instantly - accessing and passing the id of the user via mongoose _id
    const token = createToken(user._id);
    // sending / attaching a cookie, which is our jwt we have just created, httpOnly so uneditable and maxAge of 3 days, which is why it is x 1000 due to Chrome working differently.
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // Sending the DB version of the user back along with 201 code for success.
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.loginPost = async (req, res) => {
  // destructuring the email and password from request body
  const { email, password } = req.body;

  // using our login method and creating a JWT
  try {
    // this uses the static method we made in our User Model - it will return the user if successful or an error.
    const user = await User.login(email, password);
    // Log the user in instantly - accessing and passing the id of the user via mongoose _id
    const token = createToken(user._id);
    // sending / attaching a cookie, which is our jwt we have just created, httpOnly so uneditable and maxAge of 3 days, which is why it is x 1000 due to Chrome working differently.
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // return the status
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// Logging out the user
module.exports.logoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
