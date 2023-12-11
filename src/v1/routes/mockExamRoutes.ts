import MockExamController from "../controllers/mockExamController";
import { Router } from "express";
import { authenticateToken } from "../middleware/authorizationMiddleware";
const router = Router();
router.use(authenticateToken);
router.get("/users/", MockExamController.getMockExamsByUserId);
router.get("/:mockExam_id", MockExamController.getMockExamById);
router.post("/", MockExamController.checkMockExam);
router.get("/create/:language_id", MockExamController.getNewMockExam);

export = router;
