import MockExamController from "../controllers/mockExamController";
import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/authorizationMiddleware";
const router = Router();
router.use(authenticateTokenMiddleware);
router.get("/users/", MockExamController.getMockExamsByUserId);
router.get("/:mockExam_id", MockExamController.getMockExamById);
router.post("/", MockExamController.checkMockExam);
router.get("/create/:language_id", MockExamController.getNewMockExam);

export = router;
