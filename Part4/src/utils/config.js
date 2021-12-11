import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

console.log(PORT);

export default {
  MONGODB_URI,
  PORT,
};
