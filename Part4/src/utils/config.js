//import dotenv from "dotenv";
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

console.log(PORT);

// export default {
//   MONGODB_URI,
//   PORT,
// };

module.exports = {
  MONGODB_URI,
  PORT,
};
