const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });

//setup the database
connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
