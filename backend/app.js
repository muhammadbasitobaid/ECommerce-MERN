const express = require("express");
const errorMiddleware = require("./middleware/error");

// import routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

const app = express();

app.use(express.json());

app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errorMiddleware);

module.exports = app;
