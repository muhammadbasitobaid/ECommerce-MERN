const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/database");

// uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception, Error", err.message);
  console.log("Shutting Down Server!");

  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

//setup the database
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandled promise rejection, Error", err.message);
  console.log("Shutting Down Server!");

  server.close(() => {
    process.exit(1);
  });
});
