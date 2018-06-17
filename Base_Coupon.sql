/*
 Navicat MySQL Data Transfer

 Source Server         : mac
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : testdb

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 17/06/2018 14:09:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Base_Coupon
-- ----------------------------
DROP TABLE IF EXISTS `Base_Coupon`;
CREATE TABLE `Base_Coupon` (
  `couponid` int(10) NOT NULL AUTO_INCREMENT,
  `couponname` varchar(200) NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`couponid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
