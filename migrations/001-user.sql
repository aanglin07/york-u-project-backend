CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session_uuid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)