CREATE DATABASE IF NOT EXISTS receptpwa2;

USE receptpwa2;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
     `user_id` int(11) NOT NULL AUTO_INCREMENT,
     `username` varchar(255) DEFAULT NULL,
     `email` varchar(255) DEFAULT NULL,
     `password` varchar(255) DEFAULT NULL,
     PRIMARY KEY (`user_id`),
    UNIQUE (username, email)
)