import express from "express";
import TopicController from "../controllers/topicController";
const router = express.Router();

router.get("/", TopicController.getAllTopics);

router.get("/:topic_id/:user_id", TopicController.getTopicQuestions);
router.get("/:language_id", TopicController.getTopicsByLanguage);

export = router;
