const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

// import routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

const app = express(cookieParser());

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errorMiddleware);

module.exports = app;
