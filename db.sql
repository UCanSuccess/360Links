/*
SQLyog Ultimate v11.32 (64 bit)
MySQL - 5.6.21 : Database - facebook_business
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`facebook_business` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `facebook_business`;

/*Table structure for table `attachments` */

DROP TABLE IF EXISTS `attachments`;

CREATE TABLE `attachments` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `fileext` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `attachments` */

/*Table structure for table `business` */

DROP TABLE IF EXISTS `business`;

CREATE TABLE `business` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_name` varchar(255) DEFAULT NULL,
  `business_desc` text,
  `others` text,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `business` */

insert  into `business`(`_id`,`business_name`,`business_desc`,`others`) values (1,'lawyerr','fff',NULL),(2,'developer','ggg',NULL),(3,'marketing','hhh',NULL),(4,'free','fff',NULL),(5,'none','dsdfsef',NULL);

/*Table structure for table `endorse_business` */

DROP TABLE IF EXISTS `endorse_business`;

CREATE TABLE `endorse_business` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `endorser_id` int(11) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `endorse_business` */

insert  into `endorse_business`(`_id`,`business_id`,`endorser_id`,`provider_id`) values (1,1,6,1),(2,2,6,4),(3,2,6,3),(4,1,6,2);

/*Table structure for table `providers` */

DROP TABLE IF EXISTS `providers`;

CREATE TABLE `providers` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `business_id` int(11) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `providers` */

insert  into `providers`(`_id`,`user_id`,`business_id`,`description`) values (2,6,2,'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'),(3,1,1,'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'),(4,2,1,'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'),(5,3,2,'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'),(6,4,2,'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'),(7,5,3,'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'),(8,3,3,'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'),(9,5,4,NULL);

/*Table structure for table `service_verify` */

DROP TABLE IF EXISTS `service_verify`;

CREATE TABLE `service_verify` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `provider` int(11) DEFAULT NULL,
  `receiver` int(11) DEFAULT NULL,
  `amount_spent` double DEFAULT NULL,
  `verify_img` text,
  `status` int(11) DEFAULT '0',
  `rate` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `service_verify` */

insert  into `service_verify`(`_id`,`business_id`,`provider`,`receiver`,`amount_spent`,`verify_img`,`status`,`rate`) values (2,1,2,6,34,'ME.jpg',1,4);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `profile_url` text,
  `others` text,
  `privileage` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`_id`,`email`,`name`,`profile_url`,`others`,`privileage`) values (1,'peter@example.com','Peter Clark','assets/images/avatar-1.jpg',NULL,0),(2,'nicole@example.com','Nicole Bell','assets/images/avatar-2.jpg',NULL,0),(3,'steven@example.com','Steven Thompson','assets/images/avatar-3.jpg',NULL,0),(4,'ella@example.com','Ella Patterson','assets/images/avatar-4.jpg',NULL,0),(5,'kenneth@example.com','Kenneth Ross','assets/images/avatar-5.jpg',NULL,0),(6,'dandy951121@yahoo.com','Jang','assets/images/jang.png',NULL,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
