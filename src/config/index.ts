import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const env = process.env;

export default {
  port: env.PORT ? parseInt(env.PORT, 10) : 3000,
  ip: env.IP === undefined ? "localhost" : env.IP,
  env,
};
