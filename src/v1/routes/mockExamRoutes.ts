import MockExamController from "../controllers/mockExamController";
import { Router } from "express";
const router = Router();

router.get("/users/:user_id", MockExamController.getMockExamsByUserId);
router.get("/:mockExam_id", MockExamController.getMockExamById);
router.post("/", MockExamController.checkMockExam);
router.get("/:user_id/:language_id", MockExamController.getNewMockExam);

export = router;
