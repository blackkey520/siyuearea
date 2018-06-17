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

 Date: 17/06/2018 14:10:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for web_admin
-- ----------------------------
DROP TABLE IF EXISTS `web_admin`;
CREATE TABLE `web_admin` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(1) DEFAULT '0',
  `time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accessToken` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientId` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of web_admin
-- ----------------------------
BEGIN;
INSERT INTO `web_admin` VALUES (1, 'admin', '202cb962ac59075b964b07152d234b70', 0, NULL, '969f2349c2f949a82453064058e8770be002c15c', '2018-05-14 23:05:44.154', 'eggClient');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
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

 Date: 17/06/2018 14:10:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for web_news
-- ----------------------------
DROP TABLE IF EXISTS `web_news`;
CREATE TABLE `web_news` (
  `nid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `con` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `ord` int(11) DEFAULT NULL,
  `seotitle` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seokeyword` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seodesc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `langid` int(11) DEFAULT NULL,
  `time` int(50) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  `tags` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resource` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `num` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `creator` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `uploadfiles` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `images` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hotclick` int(11) DEFAULT '0',
  `salaryrange` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publishTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`nid`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of web_news
-- ----------------------------
BEGIN;
INSERT INTO `web_news` VALUES (61, 'sdf', '12ddd3', 'news1', 2, 1, '', '', '', 1, 1, 1495013232, 1, '测试标题一', '测试标题一', '0', 'admin', '[\"1495013182585Lighthouse.jpg\"]', NULL, 20, '', '', '1495013184');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
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

 Date: 17/06/2018 14:11:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for web_newsType
-- ----------------------------
DROP TABLE IF EXISTS `web_newsType`;
CREATE TABLE `web_newsType` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ord` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of web_newsType
-- ----------------------------
BEGIN;
INSERT INTO `web_newsType` VALUES (1, '加入我们', 'joinus', 1, 1, 1325472736, 1);
INSERT INTO `web_newsType` VALUES (2, '媒体资讯', 'news', 1, 1, 1325472736, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
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

 Date: 17/06/2018 14:11:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for web_node
-- ----------------------------
DROP TABLE IF EXISTS `web_node`;
CREATE TABLE `web_node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `template_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `time` int(10) NOT NULL,
  `cont` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_tempalte` (`template`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of web_node
-- ----------------------------
BEGIN;
INSERT INTO `web_node` VALUES (1, 'web_admin', '用户', 1, 1497597955, '%5B%7B%22Field%22%3A%20%22uid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%7D%2C%20%7B%22Field%22%3A%20%22name%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22pass%22%2C%20%22Type%22%3A%20%22varchar(50)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22status%22%2C%20%22Type%22%3A%20%22int(1)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20%220%22%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22time%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22accessToken%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22expires%22%2C%20%22Type%22%3A%20%22varchar(100)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22clientId%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%20%5D');
INSERT INTO `web_node` VALUES (2, 'web_news', '资讯', 1, 1497597987, '%5B%7B%22Field%22%3A%20%22nid%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%7D%2C%20%7B%22Field%22%3A%20%22title%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22con%22%2C%20%22Type%22%3A%20%22longtext%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22module%22%2C%20%22Type%22%3A%20%22varchar(50)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22type%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22ord%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22seotitle%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22seokeyword%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22seodesc%22%2C%20%22Type%22%3A%20%22varchar(500)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22uid%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22langid%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22time%22%2C%20%22Type%22%3A%20%22int(50)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22status%22%2C%20%22Type%22%3A%20%22int(1)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20%221%22%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22tags%22%2C%20%22Type%22%3A%20%22varchar(500)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22resource%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20%22%22%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22num%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20%220%22%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22creator%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20%22%22%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22uploadfiles%22%2C%20%22Type%22%3A%20%22text%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22images%22%2C%20%22Type%22%3A%20%22text%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22hotclick%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20%220%22%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22salaryrange%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22location%22%2C%20%22Type%22%3A%20%22varchar(500)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22publishTime%22%2C%20%22Type%22%3A%20%22varchar(50)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%20%5D');
INSERT INTO `web_node` VALUES (3, 'web_newsType', '资讯类别', 1, 1497598042, '%5B%7B%22Field%22%3A%20%22tid%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%7D%2C%20%7B%22Field%22%3A%20%22name%22%2C%20%22Type%22%3A%20%22varchar(100)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22link%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22ord%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22status%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22time%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%2C%20%7B%22Field%22%3A%20%22uid%22%2C%20%22Type%22%3A%20%22int(11)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%7D%20%5D%20');
INSERT INTO `web_node` VALUES (210, 'Base_Place', '工位', 1, 1526212887, '%5B%20%7B%20%22Field%22%3A%20%22pid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%20%7B%20%22Field%22%3A%20%22pname%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22ptype%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%20%2C%7B%20%22Field%22%3A%20%22pstate%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22parea%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22pdesc%22%2C%20%22Type%22%3A%20%22varchar(50)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%5D');
INSERT INTO `web_node` VALUES (215, 'Base_Record', '使用记录', 1, 1526219522, '%5B%20%7B%20%22Field%22%3A%20%22rid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%20%7B%20%22Field%22%3A%20%22pid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22mid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22oid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%20%2C%7B%20%22Field%22%3A%20%22ostate%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22btime%22%2C%20%22Type%22%3A%20%22datetime%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22etime%22%2C%20%22Type%22%3A%20%22datetime%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22disid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22discount%22%2C%20%22Type%22%3A%20%22decimal%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22money%22%2C%20%22Type%22%3A%20%22decimal%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22pdesc%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%5D');
INSERT INTO `web_node` VALUES (216, 'Base_Coupon', '优惠券', 1, 1526219643, '%5B%20%7B%20%22Field%22%3A%20%22couponid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%7B%20%22Field%22%3A%20%22couponname%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%20%2C%7B%20%22Field%22%3A%20%22discount%22%2C%20%22Type%22%3A%20%22decimal%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%5D');
INSERT INTO `web_node` VALUES (217, 'Base_UserCoupon', '用户优惠券信息', 1, 1526219907, '%5B%20%7B%20%22Field%22%3A%20%22ucid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%7B%20%22Field%22%3A%20%22uid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%7B%20%22Field%22%3A%20%22cid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%7B%20%22Field%22%3A%20%22gettime%22%2C%20%22Type%22%3A%20%22datetime%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%7B%20%22Field%22%3A%20%22overdays%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%5D');
INSERT INTO `web_node` VALUES (218, 'Base_Order', '订单', 1, 1527823803, '%5B%20%7B%20%22Field%22%3A%20%22oid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%7B%20%22Field%22%3A%20%22ordercode%22%2C%20%22Type%22%3A%20%22varchar(50)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%20%7B%20%22Field%22%3A%20%22pid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22mid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%20%2C%7B%20%22Field%22%3A%20%22ostate%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22otime%22%2C%20%22Type%22%3A%20%22datetime%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22pdesc%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%5D');
INSERT INTO `web_node` VALUES (221, 'Base_Member', '会员', 1, 1527825203, '%5B%20%7B%20%22Field%22%3A%20%22mid%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22PRI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22auto_increment%22%20%7D%2C%7B%20%22Field%22%3A%20%22membercode%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22memberopenid%22%2C%20%22Type%22%3A%20%22varchar(50)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%20%7B%20%22Field%22%3A%20%22mname%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22phonenum%22%2C%20%22Type%22%3A%20%22varchar(20)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%20%2C%7B%20%22Field%22%3A%20%22mstate%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22mregisttime%22%2C%20%22Type%22%3A%20%22datetime%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22mtype%22%2C%20%22Type%22%3A%20%22int(10)%22%2C%20%22Null%22%3A%20%22NO%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22mdesc%22%2C%20%22Type%22%3A%20%22varchar(200)%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%2C%7B%20%22Field%22%3A%20%22mmoney%22%2C%20%22Type%22%3A%20%22numeric%22%2C%20%22Null%22%3A%20%22YES%22%2C%20%22Key%22%3A%20%22UNI%22%2C%20%22Default%22%3A%20null%2C%20%22Extra%22%3A%20%22%22%20%7D%5D');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
