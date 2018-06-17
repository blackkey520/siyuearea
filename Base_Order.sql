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

 Date: 17/06/2018 14:09:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Base_Order
-- ----------------------------
DROP TABLE IF EXISTS `Base_Order`;
CREATE TABLE `Base_Order` (
  `oid` int(10) NOT NULL AUTO_INCREMENT,
  `ordercode` varchar(50) NOT NULL,
  `pid` int(10) NOT NULL,
  `mid` int(10) NOT NULL,
  `ostate` int(10) NOT NULL,
  `otime` datetime NOT NULL,
  `pdesc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Base_Order
-- ----------------------------
BEGIN;
INSERT INTO `Base_Order` VALUES (6, '1gi82776df183', 13, 1, 2, '2018-06-01 16:22:06', '');
INSERT INTO `Base_Order` VALUES (7, 'e6hc9dge7af3', 13, 2, 2, '2018-06-01 16:59:20', '');
INSERT INTO `Base_Order` VALUES (8, 'eia5h54h9f688', 21, 2, 3, '2018-06-01 15:05:13', '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
