// Packages
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv/config");

// for request logging - debugging only
const morgan = require("morgan");

// My requires
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("combined"));

// Database Connection
mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Server connected with no problems on Port: 5000");
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// Routes
app.use(authRoutes);
app.use(movieRoutes);
app.use(showRoutes);
app.use(collectionRoutes);
app.use(preferenceRoutes);
