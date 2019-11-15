-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.3.17-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- mwdb 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `mwdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mwdb`;

-- 테이블 mwdb.article 구조 내보내기
CREATE TABLE IF NOT EXISTS `article` (
  `article_id` varchar(40) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `indent` bigint(20) DEFAULT 1,
  `ref_article_id` varchar(40) DEFAULT NULL,
  `sortno` int(11) DEFAULT 1,
  `title` varchar(255) DEFAULT NULL,
  `up_article_id` varchar(40) DEFAULT NULL,
  `bbs_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `regdate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 mwdb.article:~20 rows (대략적) 내보내기
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`article_id`, `content`, `indent`, `ref_article_id`, `sortno`, `title`, `up_article_id`, `bbs_id`, `user_id`, `regdate`) VALUES
	('10', '본문..21', 1, '10', 1, '제목10', NULL, 1, 2, '2019-10-16 10:11:15'),
	('11', '본문..21', 1, '11', 1, '제목2', NULL, 1, 2, '2019-10-13 10:11:15'),
	('12', '본문..21', 1, '12', 1, '제목2', NULL, 1, 2, '2019-10-13 10:11:15'),
	('13', '본문..21', 1, '9', 1, '제목2', NULL, 1, 2, '2019-10-13 10:11:15'),
	('15', '본문..21', 1, '15', 1, '제목2', NULL, 1, 2, '2019-10-13 10:11:15'),
	('16', '본문..21', 1, '16', 1, '제목2', NULL, 1, 2, '2019-10-13 10:11:15'),
	('20', '본문..21', 1, '20', 1, '제목2', NULL, 1, 2, '2019-11-13 10:11:15'),
	('3', '본문..21', 1, '3', 1, '제목3', NULL, 1, 2, '2019-11-04 10:11:15'),
	('4', '본문..21', 1, '4', 1, '제목4', NULL, 1, 2, '2019-11-03 10:11:15'),
	('5', '본문..21', 1, '5', 1, '제목5', NULL, 1, 2, '2019-11-02 10:11:15'),
	('6', '본문..21', 1, '6', 1, '제목6', NULL, 1, 2, '2019-11-01 10:11:15'),
	('67f4daeb4751f5a6bd60f36d23da1cb7', '<p>게시글 작성</p>', 1, '67f4daeb4751f5a6bd60f36d23da1cb7', 1, '자유게시판 ', NULL, 2, 2, '2019-11-13 11:00:55'),
	('7', '본문..21', 1, '7', 1, '제목7', NULL, 1, 2, '2019-10-13 10:11:15'),
	('729a1b0c4e21f927a0bca14a2849a0ac', '<p>test</p>', 1, '67f4daeb4751f5a6bd60f36d23da1cb7', 1, 'test', NULL, 1, 2, '2019-11-13 10:11:15'),
	('7a4165444225edcba8292cdf25442388', '<p>ㅂㅈㄷㅇㅂㅇㅁㄴ</p><p>ㅇㅁㄴ<strong>ㅊㅋㅌㅊㅋ</strong>ㅌㅊ</p><h1>ㅋㅌㅋㅌㅍㅋㅌㅍㅌㅊㅍㅌㅊㅍ</h1><p>&nbsp;</p><p>&nbsp;</p>', 1, NULL, 1, 'ㅂㅈㄷㅂㅈㄷㅂㅈㄷ', NULL, 1, 2, '2019-11-13 15:04:20'),
	('8', '본문..21', 1, '8', 1, '제목8', NULL, 1, 2, '2019-10-14 10:11:15'),
	('9', '본문..21', 1, '9', 1, '제목9', NULL, 1, 2, '2019-10-15 10:11:15'),
	('c5b267c8427d1e08b7c63ab3e8492d51', '<p>test2</p>', 1, '1', 1, 'test2', NULL, 2, 2, '2019-11-13 10:11:15'),
	('cf872a704d4a5437929ace59d3357ea1', '<p>ewee</p>', 1, '1', 1, 'rrr', NULL, 1, 2, '2019-11-11 10:11:15'),
	('e5ff32c44452a10d8e928ffab9741a8f', '<p>test2</p>', 1, '1', 1, 'test2', NULL, 2, 2, '2019-11-13 10:11:15');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- 테이블 mwdb.bbs 구조 내보내기
CREATE TABLE IF NOT EXISTS `bbs` (
  `bbs_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `bbsname` varchar(100) NOT NULL,
  `use_yn` char(1) NOT NULL DEFAULT 'N',
  `depth` int(11) DEFAULT 0,
  `sortno` int(11) DEFAULT 1,
  `reguser_id` varchar(40) NOT NULL,
  `regdate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`bbs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 테이블 데이터 mwdb.bbs:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `bbs` DISABLE KEYS */;
INSERT INTO `bbs` (`bbs_id`, `category_id`, `bbsname`, `use_yn`, `depth`, `sortno`, `reguser_id`, `regdate`) VALUES
	(1, 1, '공지사항', 'Y', 0, 1, '2', '2019-11-08 11:08:00'),
	(2, 1, '자유게시판', 'Y', 0, 1, '2', '2019-11-14 13:23:37');
/*!40000 ALTER TABLE `bbs` ENABLE KEYS */;

-- 테이블 mwdb.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `dept_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- 테이블 데이터 mwdb.user:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `login_id`, `password`, `username`, `dept_id`) VALUES
	(2, 'mwuser', 'f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b', 'mwuser', 'DEPT01'),
	(17, 'mwuser2', 'f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b', 'mwuser', NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 뷰 mwdb.v_userinfo 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `v_userinfo` (
	`user_id` BIGINT(20) NOT NULL,
	`login_id` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`password` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`username` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`dept_id` VARCHAR(40) NOT NULL COLLATE 'utf8_general_ci',
	`deptname` VARCHAR(40) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;

-- 뷰 mwdb.v_userinfo 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `v_userinfo`;
CREATE ALGORITHM=UNDEFINED DEFINER=`mwuser`@`localhost` SQL SECURITY DEFINER VIEW `v_userinfo` AS select `u`.`user_id` AS `user_id`,`u`.`login_id` AS `login_id`,`u`.`password` AS `password`,`u`.`username` AS `username`,`d`.`dept_id` AS `dept_id`,`d`.`deptname` AS `deptname` from (`user` `u` join `dept` `d`) where `u`.`dept_id` = `d`.`dept_id`;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

CREATE TABLE `file` (
	`FILE_ID` VARCHAR(40) NOT NULL,
	`REF_ID` VARCHAR(40) NOT NULL,
	`FILE_NAME` VARCHAR(255) NOT NULL,
	`FILEPATH` VARCHAR(1000) NOT NULL,
	`FILESIZE` INT(11) NULL DEFAULT NULL,
	`SORTNO` INT(11) NULL DEFAULT '0',
	`type` VARCHAR(40) NULL DEFAULT '0',
	PRIMARY KEY (`FILE_ID`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

