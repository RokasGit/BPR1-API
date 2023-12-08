import express from "express";
import v1UserRouter from "./v1/routes/userRoutes";
import v1TopicRouter from "./v1/routes/topicRoutes";
import v1MockExamRouter from "./v1/routes/mockExamRoutes";
import v1QuestionRouter from "./v1/routes/questionRoutes";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/drivingexam/v1/users", v1UserRouter);
app.use("/drivingexam/v1/topics", v1TopicRouter);
app.use("/drivingexam/v1/mockexams", v1MockExamRouter);
app.use("/drivingexam/v1/questions", v1QuestionRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
