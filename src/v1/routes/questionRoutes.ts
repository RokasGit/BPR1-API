import QuestionController from "../controllers/questionController";
import { Router } from "express";
import { authenticateToken } from "../middleware/authorizationMiddleware";
const router = Router();

router.use(authenticateToken);

router.post("/:user_id", QuestionController.checkQuestion);

export = router;
