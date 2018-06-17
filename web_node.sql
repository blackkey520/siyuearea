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
