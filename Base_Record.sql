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

 Date: 17/06/2018 14:10:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Base_Record
-- ----------------------------
DROP TABLE IF EXISTS `Base_Record`;
CREATE TABLE `Base_Record` (
  `rid` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL,
  `mid` int(10) NOT NULL,
  `oid` int(10) NOT NULL,
  `ostate` int(10) NOT NULL,
  `btime` datetime NOT NULL,
  `etime` datetime NOT NULL,
  `disid` int(10) NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  `money` decimal(10,0) NOT NULL,
  `pdesc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Base_Record
-- ----------------------------
BEGIN;
INSERT INTO `Base_Record` VALUES (26, 13, 1, 6, 1, '2018-06-01 14:57:33', '2018-06-01 16:22:00', 1, 1, 60, '');
INSERT INTO `Base_Record` VALUES (27, 13, 2, 7, 1, '2018-06-01 16:23:20', '2018-06-01 16:59:19', 1, 1, 30, '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
