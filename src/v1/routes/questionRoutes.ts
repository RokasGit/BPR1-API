import QuestionController from "../controllers/questionController";
import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/authorizationMiddleware";
import { clearCacheMiddleware } from "../middleware/cachingMiddleware";

const router = Router();

router.use(authenticateTokenMiddleware);
router.post("/", clearCacheMiddleware, QuestionController.checkQuestion);
router.post("/report/", QuestionController.reportQuestion);

export = router;
