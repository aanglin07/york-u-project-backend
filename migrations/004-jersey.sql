CREATE TABLE IF NOT EXISTS `jersey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(255) NOT NULL,
  `team_kit` varchar(255) NOT NULL,
  `Year` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `league_name` varchar(255) NOT NULL,
  `purchase_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)

