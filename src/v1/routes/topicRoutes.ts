import express from "express";
import TopicController from "../controllers/topicController";
import { authenticateTokenMiddleware } from "../middleware/authorizationMiddleware";
import { cacheMiddleware } from "../middleware/cachingMiddleware";
const router = express.Router();

router.use(authenticateTokenMiddleware);
router.use(cacheMiddleware);
router.get("/", TopicController.getAllTopics);

router.get("/questions/:topic_id", TopicController.getTopicQuestions);
router.get("/:language_id", TopicController.getTopicsByLanguage);

export = router;
