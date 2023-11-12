import express from "express";
import QuestionController from "../controllers/questionController";
const router = express.Router();

router.get("/exam", QuestionController.getExam);

export = router;