import MockExamController from "../controllers/mockExamController";
import { Router } from "express";
import { authenticateTokenMiddleware } from "../middleware/authorizationMiddleware";
import {
  cacheMiddleware,
  clearCacheMiddleware,
} from "../middleware/cachingMiddleware";
const router = Router();
router.use(authenticateTokenMiddleware);
router.get("/users/", cacheMiddleware, MockExamController.getMockExamsByUserId);
router.get(
  "/:mockExam_id",
  cacheMiddleware,
  MockExamController.getMockExamById
);
router.post("/", clearCacheMiddleware, MockExamController.checkMockExam);
router.get(
  "/create/:language_id",
  cacheMiddleware,
  MockExamController.getNewMockExam
);

export = router;
