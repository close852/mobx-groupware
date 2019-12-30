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

-- 테이블 mwdb.account 구조 내보내기
CREATE TABLE IF NOT EXISTS `account` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.app 구조 내보내기
CREATE TABLE IF NOT EXISTS `app` (
  `app_id` varchar(50) NOT NULL,
  `docno` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `draft_user_id` bigint(20) DEFAULT NULL,
  `dept_id` varchar(50) NOT NULL,
  `created` timestamp NULL DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `updated_user_id` bigint(20) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `cur_taskno` int(11) DEFAULT 1,
  `cur_sortno` int(11) DEFAULT 1,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.app_line 구조 내보내기
CREATE TABLE IF NOT EXISTS `app_line` (
  `line_id` varchar(50) NOT NULL,
  `app_id` varchar(50) DEFAULT NULL,
  `auth_id` bigint(20) DEFAULT NULL,
  `auth_type` varchar(50) DEFAULT NULL,
  `taskno` bigint(20) DEFAULT NULL,
  `sortno` bigint(20) DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL COMMENT '결재/합의',
  `status` varchar(255) DEFAULT NULL COMMENT 'SIGN/CANCEL/STOP',
  `app_date` timestamp NULL DEFAULT NULL,
  `read_date` timestamp NULL DEFAULT NULL,
  `created_user_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_user_id` bigint(20) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`line_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
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
  `status` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
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

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.category 구조 내보내기
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `use_yn` char(1) NOT NULL DEFAULT 'N',
  `reguser_id` varchar(40) NOT NULL,
  `regdate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `create_id` bigint(20) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `indent` int(11) DEFAULT NULL,
  `refcomment_id` bigint(20) DEFAULT NULL,
  `sortno` int(11) DEFAULT NULL,
  `upcomment_id` bigint(20) DEFAULT NULL,
  `updated_date` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.dept 구조 내보내기
CREATE TABLE IF NOT EXISTS `dept` (
  `dept_id` varchar(40) NOT NULL,
  `deptname` varchar(40) DEFAULT NULL,
  `up_dept_id` varchar(40) DEFAULT NULL,
  `sortno` int(11) DEFAULT 1,
  `depth` int(11) DEFAULT 1,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.file 구조 내보내기
CREATE TABLE IF NOT EXISTS `file` (
  `FILE_ID` varchar(40) NOT NULL,
  `REF_ID` varchar(40) NOT NULL,
  `FILE_NAME` varchar(255) NOT NULL,
  `FILEPATH` varchar(1000) NOT NULL,
  `FILE_SIZE` int(11) DEFAULT NULL,
  `SORTNO` int(11) DEFAULT 0,
  `type` varchar(40) DEFAULT '0',
  PRIMARY KEY (`FILE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.memo 구조 내보내기
CREATE TABLE IF NOT EXISTS `memo` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `writer` varchar(40) NOT NULL,
  `contents` text NOT NULL,
  `starred` varchar(40) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit` timestamp NULL DEFAULT NULL,
  `is_edited` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.menu 구조 내보내기
CREATE TABLE IF NOT EXISTS `menu` (
  `menu_id` varchar(40) NOT NULL,
  `menu_type` varchar(40) DEFAULT NULL,
  `menu_name` varchar(40) DEFAULT NULL,
  `sortno` int(11) DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `dvider` varchar(1) DEFAULT 'N',
  `up_menu_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.mw_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `mw_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.opinion 구조 내보내기
CREATE TABLE IF NOT EXISTS `opinion` (
  `opinion_id` varchar(50) NOT NULL,
  `app_id` varchar(50) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `line_id` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `opinion` varchar(255) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `updated_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`opinion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 mwdb.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `dept_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 뷰 mwdb.v_endlist 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `v_endlist` (
	`app_id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`title` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`content` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`app_status` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`draft_user_id` BIGINT(20) NULL,
	`line_id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`action_type` VARCHAR(255) NULL COMMENT '결재/합의' COLLATE 'utf8_general_ci',
	`app_date` TIMESTAMP NULL,
	`status` VARCHAR(255) NULL COMMENT 'SIGN/CANCEL/STOP' COLLATE 'utf8_general_ci',
	`auth_id` BIGINT(20) NULL,
	`auth_type` VARCHAR(50) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;

-- 뷰 mwdb.v_processlist 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `v_processlist` (
	`app_id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`title` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`content` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`app_status` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`draft_user_id` BIGINT(20) NULL,
	`line_id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`action_type` VARCHAR(255) NULL COMMENT '결재/합의' COLLATE 'utf8_general_ci',
	`app_date` TIMESTAMP NULL,
	`status` VARCHAR(255) NULL COMMENT 'SIGN/CANCEL/STOP' COLLATE 'utf8_general_ci',
	`auth_id` BIGINT(20) NULL,
	`auth_type` VARCHAR(50) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;

-- 뷰 mwdb.v_todolist 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `v_todolist` (
	`app_id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`title` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`content` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`app_status` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`draft_user_id` BIGINT(20) NULL,
	`line_id` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`action_type` VARCHAR(255) NULL COMMENT '결재/합의' COLLATE 'utf8_general_ci',
	`app_date` TIMESTAMP NULL,
	`status` VARCHAR(255) NULL COMMENT 'SIGN/CANCEL/STOP' COLLATE 'utf8_general_ci',
	`auth_id` BIGINT(20) NULL,
	`auth_type` VARCHAR(50) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;

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

-- 뷰 mwdb.v_endlist 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `v_endlist`;
CREATE ALGORITHM=UNDEFINED DEFINER=`mwuser`@`localhost` SQL SECURITY DEFINER VIEW `v_endlist` AS select `a`.`app_id` AS `app_id`,`a`.`title` AS `title`,`a`.`content` AS `content`,`a`.`status` AS `app_status`,`a`.`draft_user_id` AS `draft_user_id`,`l`.`line_id` AS `line_id`,`l`.`action_type` AS `action_type`,`l`.`app_date` AS `app_date`,`l`.`status` AS `status`,`l`.`auth_id` AS `auth_id`,`l`.`auth_type` AS `auth_type` from (`app` `a` join `app_line` `l`) where `a`.`app_id` = `l`.`app_id` and `a`.`status` = 'END';

-- 뷰 mwdb.v_processlist 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `v_processlist`;
CREATE ALGORITHM=UNDEFINED DEFINER=`mwuser`@`localhost` SQL SECURITY DEFINER VIEW `v_processlist` AS select `a`.`app_id` AS `app_id`,`a`.`title` AS `title`,`a`.`content` AS `content`,`a`.`status` AS `app_status`,`a`.`draft_user_id` AS `draft_user_id`,`l`.`line_id` AS `line_id`,`l`.`action_type` AS `action_type`,`l`.`app_date` AS `app_date`,`l`.`status` AS `status`,`l`.`auth_id` AS `auth_id`,`l`.`auth_type` AS `auth_type` from (`app` `a` join `app_line` `l`) where `a`.`app_id` = `l`.`app_id` and `l`.`status` = 'SIGN';

-- 뷰 mwdb.v_todolist 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `v_todolist`;
CREATE ALGORITHM=UNDEFINED DEFINER=`mwuser`@`localhost` SQL SECURITY DEFINER VIEW `v_todolist` AS select `a`.`app_id` AS `app_id`,`a`.`title` AS `title`,`a`.`content` AS `content`,`a`.`status` AS `app_status`,`a`.`draft_user_id` AS `draft_user_id`,`l`.`line_id` AS `line_id`,`l`.`action_type` AS `action_type`,`l`.`app_date` AS `app_date`,`l`.`status` AS `status`,`l`.`auth_id` AS `auth_id`,`l`.`auth_type` AS `auth_type` from (`app` `a` join `app_line` `l`) where `a`.`app_id` = `l`.`app_id` and `a`.`cur_taskno` = `l`.`taskno` and `a`.`cur_sortno` = `l`.`sortno`;

-- 뷰 mwdb.v_userinfo 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `v_userinfo`;
CREATE ALGORITHM=UNDEFINED DEFINER=`mwuser`@`localhost` SQL SECURITY DEFINER VIEW `v_userinfo` AS select `u`.`user_id` AS `user_id`,`u`.`login_id` AS `login_id`,`u`.`password` AS `password`,`u`.`username` AS `username`,`d`.`dept_id` AS `dept_id`,`d`.`deptname` AS `deptname` from (`user` `u` join `dept` `d`) where `u`.`dept_id` = `d`.`dept_id`;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
