const express = require("express");
const errorMiddleware = require("./middleware/error");

// import routes
const product = require("./routes/productRoute");

const app = express();

app.use(express.json());

app.use("/api/v1", product);

app.use(errorMiddleware);

module.exports = app;
