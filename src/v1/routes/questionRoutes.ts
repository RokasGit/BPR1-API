import QuestionController from "../controllers/questionController";
import { Router } from "express";
const router = Router();

router.post("/:user_id", QuestionController.checkQuestion);

export = router;
