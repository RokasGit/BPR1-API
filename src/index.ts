import express from "express";
import v1UserRouter from "./v1/routes/userRoutes";
import v1TopicRouter from "./v1/routes/topicRoutes";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  "/drivingexam/v1/users",
  v1UserRouter
);
app.use(
  "/drivingexam/v1/topics",
  v1TopicRouter
);

const port =
  process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server started on port ${port}`
  );
});
