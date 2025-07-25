CREATE DATABASE IF NOT EXISTS receptpwa2;

USE receptpwa2;

CREATE TABLE IF NOT EXISTS `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE (username),
    UNIQUE (email),
    CONSTRAINT CHK_PasswordLength CHECK (CHAR_LENGTH(password) >= 8)
);

