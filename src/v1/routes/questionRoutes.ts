import QuestionController from "../controllers/questionController";
import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/authorizationMiddleware";
const router = Router();

router.use(authenticateTokenMiddleware);

router.post("/:user_id", QuestionController.checkQuestion);
router.post("/report/", QuestionController.reportQuestion);

export = router;
