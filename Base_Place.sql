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

 Date: 17/06/2018 14:10:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Base_Place
-- ----------------------------
DROP TABLE IF EXISTS `Base_Place`;
CREATE TABLE `Base_Place` (
  `pid` int(10) NOT NULL AUTO_INCREMENT,
  `pname` varchar(20) NOT NULL,
  `ptype` int(10) NOT NULL,
  `pstate` int(10) NOT NULL,
  `parea` varchar(20) NOT NULL,
  `pdesc` varchar(50) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Base_Place
-- ----------------------------
BEGIN;
INSERT INTO `Base_Place` VALUES (1, '1A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (2, '2A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (3, '3A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (4, '4A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (5, '5A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (6, '6A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (7, '7A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (8, '8A', 1, 0, 'A区', 'A区');
INSERT INTO `Base_Place` VALUES (9, '1B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (10, '2B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (11, '3B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (12, '4B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (13, '5B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (14, '6B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (15, '7B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (16, '8B', 1, 0, 'B区', 'B区');
INSERT INTO `Base_Place` VALUES (17, '1C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (18, '2C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (19, '3C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (20, '4C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (21, '5C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (22, '6C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (23, '7C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (24, '8C', 1, 0, 'C区', 'C区');
INSERT INTO `Base_Place` VALUES (25, '1D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (26, '2D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (27, '3D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (28, '4D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (29, '5D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (30, '6D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (31, '7D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (32, '8D', 1, 0, 'D区', 'D区');
INSERT INTO `Base_Place` VALUES (33, '1E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (34, '2E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (35, '3E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (36, '4E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (37, '5E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (38, '6E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (39, '7E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (40, '8E', 1, 0, 'E区', 'E区');
INSERT INTO `Base_Place` VALUES (41, '1F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (42, '2F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (43, '3F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (44, '4F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (45, '5F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (46, '6F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (47, '7F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (48, '8F', 1, 0, 'F区', 'F区');
INSERT INTO `Base_Place` VALUES (49, '1G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (50, '2G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (51, '3G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (52, '4G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (53, '5G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (54, '6G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (55, '7G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (56, '8G', 1, 0, 'G区', 'G区');
INSERT INTO `Base_Place` VALUES (57, '1O', 2, 0, 'O区', 'O区');
INSERT INTO `Base_Place` VALUES (58, '2O', 2, 0, 'O区', 'O区');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
