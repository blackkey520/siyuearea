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

 Date: 17/06/2018 14:08:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Base_Member
-- ----------------------------
DROP TABLE IF EXISTS `Base_Member`;
CREATE TABLE `Base_Member` (
  `mid` int(10) NOT NULL AUTO_INCREMENT,
  `membercode` varchar(20) NOT NULL,
  `memberopenid` varchar(50) DEFAULT NULL,
  `mname` varchar(20) NOT NULL,
  `phonenum` varchar(20) NOT NULL,
  `mstate` int(10) NOT NULL,
  `mregisttime` datetime NOT NULL,
  `mtype` int(10) NOT NULL,
  `mdesc` varchar(200) DEFAULT NULL,
  `mmoney` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Base_Member
-- ----------------------------
BEGIN;
INSERT INTO `Base_Member` VALUES (1, 'globaluser', 'null', '公用账户', '000 000 0000', 0, '2018-06-01 11:54:04', 1, '', 9999640);
INSERT INTO `Base_Member` VALUES (2, '696i9je30g698', 'oLMF30yr4wzpsvQSiO6mSIwIozRU', '派大星大魔王', '432 4234 2342', 1, '2018-06-01 13:54:03', 1, '', 970);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
