-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 09, 2025 at 07:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_astracare`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_buildings`
--

CREATE TABLE `tbl_buildings` (
  `id` int(10) NOT NULL,
  `building_name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `status` varchar(10) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_buildings`
--

INSERT INTO `tbl_buildings` (`id`, `building_name`, `description`, `status`, `date_added`, `date_updated`) VALUES
(1, 'Main Building', 'The primary building in the compound', 'REMOVED', '2025-06-13 03:26:43', '2025-06-13 19:27:00'),
(2, 'Makiling Building', 'The primary building in the compound', 'ACTIVE', '2025-06-13 03:29:20', '2025-06-13 19:24:34'),
(3, 'NSC', 'This is for Fidelis Senior High students', 'ACTIVE', '2025-06-13 19:26:20', '2025-06-13 19:26:20'),
(4, 'FCS', 'The primary building in senior high school', 'ACTIVE', '2025-06-20 17:37:57', '2025-06-20 17:38:22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_courses`
--

CREATE TABLE `tbl_courses` (
  `id` int(10) NOT NULL,
  `department_id` int(10) NOT NULL,
  `course_name` varchar(10) NOT NULL,
  `description` varchar(200) NOT NULL,
  `status` varchar(10) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_courses`
--

INSERT INTO `tbl_courses` (`id`, `department_id`, `course_name`, `description`, `status`, `date_added`, `date_updated`) VALUES
(1, 1, 'BSIT', 'Bachelor of Science in Information Technology', 'ACTIVE', '2025-06-05 17:02:01', '2025-06-09 22:20:08'),
(2, 1, 'BSCS', 'Bachelor of Science in Computer Science', 'REMOVED', '2025-06-05 17:05:38', '2025-06-09 22:22:38'),
(3, 3, 'BSCrim', 'Bachelor of Science in Criminology', 'ACTIVE', '2025-06-09 21:47:08', '2025-06-09 22:07:03'),
(4, 6, 'BST', 'Bachelor of Science in Tourism', 'ACTIVE', '2025-06-09 22:20:36', '2025-06-09 22:20:36'),
(5, 5, 'BSN', 'Bachelor of Science in Nursing', 'ACTIVE', '2025-06-09 22:21:58', '2025-06-09 22:21:58'),
(6, 5, 'BSMT', 'Bachelor of Science in Medical Technology', 'ACTIVE', '2025-06-09 22:22:28', '2025-06-09 22:22:28'),
(7, 7, 'BSeD', 'Bachelor of Science in Education', 'ACTIVE', '2025-06-20 17:34:44', '2025-06-20 17:35:10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `id` int(10) NOT NULL,
  `department_name` varchar(10) NOT NULL,
  `description` varchar(200) NOT NULL,
  `status` varchar(10) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`id`, `department_name`, `description`, `status`, `date_added`, `date_updated`) VALUES
(1, 'CCIT', 'College of Computing and Information Technology', 'ACTIVE', '2025-06-05 16:04:57', '2025-06-09 21:06:52'),
(2, 'COE', 'College of Engineering', 'ACTIVE', '2025-06-05 16:19:25', '2025-06-09 14:29:50'),
(3, 'COPS', 'College of Public and Safety', 'ACTIVE', '2025-06-05 16:40:43', '2025-06-20 17:32:04'),
(4, 'CBA', 'College of Business and Accountancy', 'REMOVED', '2025-06-09 09:53:46', '2025-06-09 21:43:03'),
(5, 'CON', 'College of Nursing', 'ACTIVE', '2025-06-09 10:00:23', '2025-06-09 10:00:23'),
(6, 'CTM', 'College of Tourism Managements', 'ACTIVE', '2025-06-09 10:19:34', '2025-06-09 13:57:08'),
(7, 'COed', 'College of Education', 'ACTIVE', '2025-06-20 17:31:28', '2025-06-20 17:33:13');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_forms`
--

CREATE TABLE `tbl_forms` (
  `id` int(10) NOT NULL,
  `form_key` varchar(100) NOT NULL,
  `form_title` varchar(200) NOT NULL,
  `instruction` varchar(500) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `user_id` int(10) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_forms`
--

INSERT INTO `tbl_forms` (`id`, `form_key`, `form_title`, `instruction`, `status`, `user_id`, `date_added`, `date_updated`) VALUES
(1, '1750250076006-3542', 'Employee Health Declaration for COVID-19 Prevention', 'Data Privacy Clause: By completing this form, I hereby agree that FAITH Colleges may collect, use, disclose, and process my personal data for the purpose of reviewing travel history and current health status of employees to prevent the risks of the corona virus or COVID-19 infection.', 'PUBLISHED', 1, '2025-06-18 20:34:36', '2025-06-20 17:43:09'),
(2, '1750412545189-6784', 'Employee Health Declaration for COVID-19 Prevention v3', 'This is an instructions', 'DRAFT', 1, '2025-06-20 17:42:25', '2025-06-20 17:43:37');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_health`
--

CREATE TABLE `tbl_health` (
  `id` int(10) NOT NULL,
  `form_key` varchar(200) NOT NULL,
  `user_id` int(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_health`
--

INSERT INTO `tbl_health` (`id`, `form_key`, `user_id`, `status`, `date_added`, `time`) VALUES
(1, '1750250076006-3542', 12, 'LATE', '2025-07-01', '13:47:58'),
(2, '1750250076006-3542', 12, 'ACTIVE', '2025-07-02', '08:00:00'),
(3, '1750250076006-3542', 12, 'ACTIVE', '2025-07-03', '07:47:58'),
(4, '1750250076006-3542', 12, 'ACTIVE', '2025-07-04', '08:00:00'),
(6, '1750250076006-3542', 12, 'LATE', '2025-07-05', '19:44:48'),
(7, '1750250076006-3542', 12, 'ACTIVE', '2025-07-06', '00:14:13'),
(13, '1750250076006-3542', 12, 'LATE', '2025-07-07', '13:36:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_options`
--

CREATE TABLE `tbl_options` (
  `id` int(10) NOT NULL,
  `question_id` int(10) NOT NULL,
  `option_name` varchar(200) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_options`
--

INSERT INTO `tbl_options` (`id`, `question_id`, `option_name`, `status`, `date_added`, `date_updated`) VALUES
(1, 1, 'Work From Home', 'ACTIVE', '2025-06-18 20:38:41', '2025-06-18 20:38:41'),
(2, 1, 'In-Person reporting', 'ACTIVE', '2025-06-18 20:38:41', '2025-06-18 20:38:41'),
(3, 2, 'Fever (37.5 C and above)', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(4, 2, 'Redness of Eye(s)', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(5, 2, 'Loss of sense of smell/taste', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(6, 2, 'Runny nose/colds', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(7, 2, 'Sore throat', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(8, 2, 'Cough', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(9, 2, 'Body Pains (Muscles / Bones / Joints)', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(10, 3, 'Yes', 'ACTIVE', '2025-06-18 20:40:52', '2025-06-18 20:40:52'),
(11, 3, 'No', 'ACTIVE', '2025-06-18 20:40:52', '2025-06-18 20:40:52'),
(12, 4, 'Yes', 'ACTIVE', '2025-06-18 20:41:08', '2025-06-18 20:41:08'),
(13, 4, 'No', 'ACTIVE', '2025-06-18 20:41:08', '2025-06-18 20:41:08'),
(14, 5, 'Yes', 'ACTIVE', '2025-06-18 20:41:25', '2025-06-18 20:41:25'),
(15, 5, 'No', 'ACTIVE', '2025-06-18 20:41:25', '2025-06-18 20:41:25'),
(16, 6, 'Yes', 'ACTIVE', '2025-06-18 20:42:00', '2025-06-18 20:42:00'),
(17, 6, 'No', 'ACTIVE', '2025-06-18 20:42:00', '2025-06-18 20:42:00'),
(18, 7, 'Yes', 'ACTIVE', '2025-06-18 20:42:30', '2025-06-18 20:42:30'),
(19, 7, 'No', 'ACTIVE', '2025-06-18 20:42:30', '2025-06-18 20:42:30'),
(20, 8, 'Yes', 'ACTIVE', '2025-06-20 17:44:52', '2025-06-20 17:44:52'),
(21, 8, 'No', 'ACTIVE', '2025-06-20 17:44:52', '2025-06-20 17:44:52'),
(22, 8, 'Either of the 2', 'ACTIVE', '2025-06-20 17:44:52', '2025-06-20 17:44:52');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_questions`
--

CREATE TABLE `tbl_questions` (
  `id` int(10) NOT NULL,
  `form_key` varchar(100) NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer_type` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_questions`
--

INSERT INTO `tbl_questions` (`id`, `form_key`, `question`, `answer_type`, `status`, `date_added`, `date_updated`) VALUES
(1, '1750250076006-3542', 'Work arrangement for the day?', 'Multiple', 'ACTIVE', '2025-06-18 20:38:41', '2025-06-18 20:38:41'),
(2, '1750250076006-3542', 'What symptoms/illnesses are you experiencing right now? (Check all that apply) *', 'Check', 'ACTIVE', '2025-06-18 20:40:28', '2025-06-18 20:40:28'),
(3, '1750250076006-3542', 'Have you had any interaction with anyone who exhibits any of the symptoms described above?', 'Multiple', 'ACTIVE', '2025-06-18 20:40:52', '2025-06-18 20:40:52'),
(4, '1750250076006-3542', 'Have you had physical or social contact with anyone who has undergone RT-PCR or Antigen test in the past 14 days?', 'Multiple', 'ACTIVE', '2025-06-18 20:41:08', '2025-06-18 20:41:08'),
(5, '1750250076006-3542', 'Have you had physical or social contact with anyone or suspected to be infected with COVID-19 within the past 14 days?', 'Multiple', 'ACTIVE', '2025-06-18 20:41:25', '2025-06-18 20:41:25'),
(6, '1750250076006-3542', 'Did you visit any hospital or clinic (face to face consultation/laboratory) in the last 14 days? ', 'Multiple', 'ACTIVE', '2025-06-18 20:42:00', '2025-06-18 20:42:00'),
(7, '1750250076006-3542', 'Do you have an update with regards to your vaccination details?', 'Multiple', 'ACTIVE', '2025-06-18 20:42:30', '2025-06-18 20:42:30'),
(8, '1750412545189-6784', 'Do you have fever?', 'Multiple', 'ACTIVE', '2025-06-20 17:44:52', '2025-06-20 17:44:52'),
(9, '1750250076006-3542', 'Enter your address', 'Text', 'ACTIVE', '2025-07-02 04:46:33', '2025-07-02 04:46:33');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_responses`
--

CREATE TABLE `tbl_responses` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `healtdec_id` int(10) NOT NULL,
  `question_id` int(10) NOT NULL,
  `types` varchar(20) NOT NULL,
  `option_id` int(10) NOT NULL,
  `text` varchar(200) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `date_submitted` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_responses`
--

INSERT INTO `tbl_responses` (`id`, `user_id`, `healtdec_id`, `question_id`, `types`, `option_id`, `text`, `status`, `date_added`, `date_updated`, `date_submitted`) VALUES
(1, 12, 1, 1, 'radio', 1, '', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(2, 12, 1, 2, 'checkbox', 3, '', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(3, 12, 1, 7, 'radio', 19, '', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(4, 12, 1, 9, 'text', 0, 'Calamba', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(5, 12, 1, 5, 'radio', 14, '', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(6, 12, 1, 6, 'radio', 16, '', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(7, 12, 1, 3, 'radio', 10, '', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(8, 12, 1, 4, 'radio', 12, '', 'ACTIVE', '2025-07-05 13:47:58', '2025-07-05 13:47:58', '2025-07-05'),
(18, 12, 2, 1, 'radio', 1, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(19, 12, 2, 2, 'checkbox', 3, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(20, 12, 2, 2, 'checkbox', 8, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(21, 12, 2, 9, 'text', 0, 'Calamba', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(22, 12, 2, 7, 'radio', 18, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(23, 12, 2, 6, 'radio', 16, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(24, 12, 2, 5, 'radio', 14, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(25, 12, 2, 3, 'radio', 10, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(26, 12, 2, 4, 'radio', 12, '', 'ACTIVE', '2025-07-05 17:13:28', '2025-07-05 17:13:28', '2025-07-05'),
(27, 12, 6, 1, 'radio', 2, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(28, 12, 6, 2, 'checkbox', 3, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(29, 12, 6, 2, 'checkbox', 4, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(30, 12, 6, 2, 'checkbox', 5, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(31, 12, 6, 3, 'radio', 10, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(32, 12, 6, 4, 'radio', 12, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(33, 12, 6, 5, 'radio', 14, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(34, 12, 6, 6, 'radio', 16, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(35, 12, 6, 7, 'radio', 18, '', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(36, 12, 6, 9, 'text', 0, 'Calamba', 'ACTIVE', '2025-07-05 19:44:48', '2025-07-05 19:44:48', '2025-07-05'),
(37, 12, 7, 1, 'radio', 1, '', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(38, 12, 7, 2, 'checkbox', 3, '', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(39, 12, 7, 3, 'radio', 10, '', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(40, 12, 7, 4, 'radio', 12, '', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(41, 12, 7, 5, 'radio', 14, '', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(42, 12, 7, 7, 'radio', 18, '', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(43, 12, 7, 9, 'text', 0, 'Calamba', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(44, 12, 7, 6, 'radio', 16, '', 'ACTIVE', '2025-07-06 00:14:13', '2025-07-06 00:14:13', '2025-07-05'),
(53, 12, 13, 1, 'radio', 1, '', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07'),
(54, 12, 13, 2, 'checkbox', 3, '', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07'),
(55, 12, 13, 3, 'radio', 10, '', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07'),
(56, 12, 13, 4, 'radio', 12, '', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07'),
(57, 12, 13, 5, 'radio', 14, '', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07'),
(58, 12, 13, 7, 'radio', 18, '', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07'),
(59, 12, 13, 9, 'text', 0, 'Calamba', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07'),
(60, 12, 13, 6, 'radio', 16, '', 'ACTIVE', '2025-07-07 13:36:09', '2025-07-07 13:36:09', '2025-07-07');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rooms`
--

CREATE TABLE `tbl_rooms` (
  `id` int(10) NOT NULL,
  `building_id` int(10) NOT NULL,
  `room_key` varchar(200) NOT NULL,
  `room_name` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_rooms`
--

INSERT INTO `tbl_rooms` (`id`, `building_id`, `room_key`, `room_name`, `status`, `date_added`, `date_updated`) VALUES
(1, 1, '1749757198803-3837', 'Computer Lab 4', 'ACTIVE', '2025-06-13 03:39:58', '2025-06-13 19:38:32'),
(2, 1, '1749757286541-6901', 'Computer Lab 2', 'REMOVED', '2025-06-13 03:41:26', '2025-06-13 19:38:41'),
(3, 2, '1749757302720-3311', 'Computer Lab 3', 'ACTIVE', '2025-06-13 03:41:42', '2025-06-13 19:42:07'),
(4, 3, '1749814818376-7053', 'Room 146', 'ACTIVE', '2025-06-13 19:40:18', '2025-06-13 19:40:18'),
(5, 2, '1749814832390-4850', 'Room 147', 'ACTIVE', '2025-06-13 19:40:32', '2025-06-13 19:41:56'),
(6, 2, '1750412389546-2571', 'Computer Lab 5', 'ACTIVE', '2025-06-20 17:39:49', '2025-06-20 17:40:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_room_logs`
--

CREATE TABLE `tbl_room_logs` (
  `id` int(10) NOT NULL,
  `log_key` varchar(100) NOT NULL,
  `room_key` varchar(100) NOT NULL,
  `user_id` int(10) NOT NULL,
  `log_date` date NOT NULL,
  `log_in` varchar(10) NOT NULL,
  `log_out` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_room_logs`
--

INSERT INTO `tbl_room_logs` (`id`, `log_key`, `room_key`, `user_id`, `log_date`, `log_in`, `log_out`, `status`) VALUES
(1, '1751989807716-2267', '1750412389546-2571', 12, '2025-07-08', '23:50:07', '00:01:35', 'ACTIVE'),
(4, '1751991177607-2076', '1749814818376-7053', 12, '2025-07-09', '00:12:57', '00:22:00', 'ACTIVE'),
(5, '1752003505570-5704', '1750412389546-2571', 12, '2025-07-09', '03:38:25', '04:04:42', 'ACTIVE'),
(6, '1752004576110-1485', '1750412389546-2571', 12, '2025-07-09', '03:56:16', '04:04:42', 'ACTIVE'),
(7, '1752005101433-4807', '1749757302720-3311', 12, '2025-07-09', '04:05:01', '04:05:11', 'ACTIVE'),
(8, '1752005135173-1459', '1750412389546-2571', 12, '2025-07-09', '04:05:35', '', 'WAITING');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sections`
--

CREATE TABLE `tbl_sections` (
  `id` int(10) NOT NULL,
  `course_id` int(10) NOT NULL,
  `section_name` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sections`
--

INSERT INTO `tbl_sections` (`id`, `course_id`, `section_name`, `status`, `date_added`, `date_updated`) VALUES
(1, 1, 'A3', 'ACTIVE', '2025-06-05 17:19:34', '2025-06-12 23:20:24'),
(2, 4, 'A4', 'REMOVED', '2025-06-05 17:25:33', '2025-06-13 00:09:44'),
(3, 1, 'A4', 'ACTIVE', '2025-06-05 17:30:58', '2025-06-13 00:08:33'),
(4, 4, 'A2', 'ACTIVE', '2025-06-12 23:41:54', '2025-06-13 00:08:24'),
(5, 1, 'A1', 'ACTIVE', '2025-06-13 00:09:59', '2025-06-13 00:09:59'),
(6, 1, 'A2', 'ACTIVE', '2025-06-13 00:10:09', '2025-06-13 00:10:09'),
(7, 4, 'A1', 'ACTIVE', '2025-06-13 00:10:53', '2025-06-13 00:10:53'),
(8, 4, 'A3', 'ACTIVE', '2025-06-13 00:11:11', '2025-06-13 00:11:11'),
(9, 1, 'A5', 'ACTIVE', '2025-06-20 17:36:24', '2025-06-20 17:36:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_time`
--

CREATE TABLE `tbl_time` (
  `id` int(10) NOT NULL,
  `time` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_time`
--

INSERT INTO `tbl_time` (`id`, `time`, `status`, `date_added`, `date_updated`) VALUES
(1, '08:00', 'PUBLISHED', '2025-07-05 02:26:51', '2025-07-05 02:26:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(10) NOT NULL,
  `stud_emp_id` varchar(20) NOT NULL,
  `role` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `department_id` int(10) NOT NULL,
  `yearlevel` varchar(20) NOT NULL,
  `course_id` int(10) DEFAULT NULL,
  `section_id` int(10) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `stud_emp_id`, `role`, `email`, `password`, `lastname`, `firstname`, `middlename`, `phone`, `department_id`, `yearlevel`, `course_id`, `section_id`, `status`, `date_added`, `date_updated`) VALUES
(7, 'EMP001', 'student', 'testuser@example.com', 'testpassword', 'Doe', 'John Michael', 'M', '1234567890', 1, '', 1, 1, 'ACTIVE', '2025-06-02 13:44:14', '2025-06-02 13:54:37'),
(8, 'EMP002', 'student', 'janedoe@example.com', '$2a$10$eF4quwuiK0hWljsnBOEMvOTwsQxyDeef8vZ0ix4cw01skgtKmt68u', 'Doe', 'Jane', 'A', '0987654321', 1, '', 1, 1, 'ACTIVE', '2025-07-02 15:24:08', '2025-07-02 15:24:08'),
(9, '123456', 'student', 'cruz.jerwin15@gmail.com', '$2b$10$7VupjxvFJaMzxEu1A/fHB.DTHiHk1xq/FB/MFBYcll8d/c7AZLfa2', 'Cruz', 'Jerwin', 'Pinangang', '09121234567', 6, '1', 4, 7, 'PENDING', '2025-07-02 21:55:11', '2025-07-02 21:55:11'),
(10, '12345687', 'student', 'cruz.jerwin15@gmail.com', '$2b$10$kOatYlsOVggESBApcPxhpekQRyLotzaBC0BwpmgEqCZGqTsgISRTi', 'Cruz', 'John', 'Pinangang', '09121234567', 1, '4', 1, 3, 'PENDING', '2025-07-02 21:57:04', '2025-07-02 21:57:04'),
(11, 'S20121234567', 'student', 'jpcruz@firstasia.edu.ph', '$2b$10$nak1IAKwQAUdDqgkQUgvSO843qzOkgML61CPlK8QdaRd0ilGu7HSm', 'Parker', 'Peter', 'N/A', '09151234567', 1, '2', 1, 5, 'PENDING', '2025-07-02 21:58:31', '2025-07-02 21:58:31'),
(12, 'S20161234567', 'student', 'jenne@gmail.com', '$2b$10$KCGVIqBpvlKKHZz4wvHhCupCLo6kKtVzjUjN3Vi70ZT6MCvT77WoW', 'Mercado', 'Jenny', 'Santos', '09151234567', 1, '3', 1, 6, 'ACTIVE', '2025-07-02 22:00:27', '2025-07-02 22:00:27'),
(13, '1234567', 'eomployee', 'john@gmail.com', '$2b$10$cVyEQz6cQdivtJLehIJp4.OcJfDyMf0LD2LW22XMizNUW8eqMTpq.', 'Santos', 'John', 'Dela Cruz', '09151234567', 2, '0', 0, 0, 'PENDING', '2025-07-03 15:35:17', '2025-07-03 15:35:17'),
(14, '98765432', 'eomployee', 'jesse@gmail.com', '$2b$10$l/Q4d8/Jq0a.h6LKmAAGWOopRRFaQrtK/2/vxcxNDgMYSuRrzDLpq', 'Alvarez', 'Jesse', 'Santos', '00141234567', 2, '0', 0, 0, 'PENDING', '2025-07-03 15:41:01', '2025-07-03 15:41:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_buildings`
--
ALTER TABLE `tbl_buildings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_courses`
--
ALTER TABLE `tbl_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_forms`
--
ALTER TABLE `tbl_forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_health`
--
ALTER TABLE `tbl_health`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_options`
--
ALTER TABLE `tbl_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_responses`
--
ALTER TABLE `tbl_responses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_room_logs`
--
ALTER TABLE `tbl_room_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sections`
--
ALTER TABLE `tbl_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_time`
--
ALTER TABLE `tbl_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_buildings`
--
ALTER TABLE `tbl_buildings`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_courses`
--
ALTER TABLE `tbl_courses`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_forms`
--
ALTER TABLE `tbl_forms`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_health`
--
ALTER TABLE `tbl_health`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_options`
--
ALTER TABLE `tbl_options`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_responses`
--
ALTER TABLE `tbl_responses`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_room_logs`
--
ALTER TABLE `tbl_room_logs`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_sections`
--
ALTER TABLE `tbl_sections`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_time`
--
ALTER TABLE `tbl_time`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
