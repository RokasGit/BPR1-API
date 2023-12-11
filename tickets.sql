-- mysql
-- Create database `Tickets`
CREATE DATABASE `Tickets` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `Tickets`;
CREATE TABLE `language` (
  `language_id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `language_id` int(11) DEFAULT 1,
  `score` int(11) DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_email` (`email`),
  FOREIGN KEY (`language_id`) REFERENCES `language`(`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `badge` (
  `badge_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `requirement` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `mockExam` (
    `mockexam_id` int(11) NOT NULL AUTO_INCREMENT,
    `percentage` double(5,2) NOT NULL,
    `user_id` int(11) NOT NULL,
    `completion_date` datetime NOT NULL,
    PRIMARY KEY (`mockexam_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `topic` (
    `topic_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `language_id` int(11) NOT NULL,
    PRIMARY KEY (`topic_id`),
    FOREIGN KEY (`language_id`) REFERENCES `language`(`language_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `question` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `question` varchar(255) NOT NULL,
    `topic_id` int(11) NOT NULL,
    `image` varchar(255) NOT NULL,
    `explanation` varchar(255) NOT NULL,
    PRIMARY KEY (`question_id`),
    FOREIGN KEY (`topic_id`) REFERENCES `topic`(`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `answer` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `answer` varchar(255) NOT NULL,
    `question_id` int(11) NOT NULL,
    `is_correct` tinyint(1) NOT NULL,
    PRIMARY KEY (`answer_id`),
    FOREIGN KEY (`question_id`) REFERENCES `question`(`question_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `userBadge` (
    `user_id` int(11) NOT NULL,
    `badge_id` int(11) NOT NULL,
    PRIMARY KEY (`user_id`, `badge_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`badge_id`) REFERENCES `badge`(`badge_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `questionStatus` (
    `user_id` int(11) NOT NULL,
    `question_id` int(11) NOT NULL,
    `status` varchar(20) NOT NULL,
    PRIMARY KEY (`user_id`, `question_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`question_id`) REFERENCES `question`(`question_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `subscription` (
    `subscription_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `subscription_start_date` datetime NOT NULL,
    `subscription_end_date` datetime NOT NULL,
    PRIMARY KEY (`subscription_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
