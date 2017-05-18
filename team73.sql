-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2017 at 07:53 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `team73`
--

-- --------------------------------------------------------

--
-- Table structure for table `customerinfo`
--

DROP TABLE IF EXISTS `customerinfo`;
CREATE TABLE IF NOT EXISTS `customerinfo` (
  `AccNumber` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(10) DEFAULT NULL,
  `FirstName` varchar(20) DEFAULT NULL,
  `LastName` varchar(20) DEFAULT NULL,
  `PhoneNumber` varchar(10) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `DOB` varchar(10) DEFAULT NULL,
  `DelStreetAddress` varchar(100) DEFAULT NULL,
  `DelCity` varchar(50) DEFAULT NULL,
  `DelPostcode` varchar(10) DEFAULT NULL,
  `DelState` varchar(50) DEFAULT NULL,
  `LPGCylinderRequire` int(2) DEFAULT NULL,
  `PromotionalCode` varchar(10) DEFAULT NULL,
  `IfCylinderExist` varchar(5) DEFAULT NULL,
  `IfNewInstallation` varchar(5) DEFAULT NULL,
  `NoticeOfCompletion` blob,
  `Suppliers` varchar(20) DEFAULT NULL,
  `gasStartedDate` varchar(10) DEFAULT NULL,
  `OwnOrRent` varchar(4) DEFAULT NULL,
  `AgentOrLandLordName` varchar(50) DEFAULT NULL,
  `AgentOrLandLordNumber` varchar(20) DEFAULT NULL,
  `PromoteCode` varchar(10) DEFAULT NULL,
  `FlybuysNumber` varchar(4) DEFAULT NULL,
  `MiddleName` varchar(20) DEFAULT NULL,
  `ConfirmEmail` varchar(100) DEFAULT NULL,
  `MobileNumber` varchar(10) DEFAULT NULL,
  `AfterHoursNumber` varchar(10) DEFAULT NULL,
  `WorkNumber` varchar(10) DEFAULT NULL,
  `SecondaryTitle` varchar(10) DEFAULT NULL,
  `SecondaryFirstName` varchar(20) DEFAULT NULL,
  `SecondaryLastName` varchar(20) DEFAULT NULL,
  `SecondaryRelationship` varchar(20) DEFAULT NULL,
  `SecondaryDOB` varchar(10) DEFAULT NULL,
  `BillingStreetAddress` varchar(100) DEFAULT NULL,
  `BillingSuburb` varchar(50) DEFAULT NULL,
  `BillingPostcode` varchar(10) DEFAULT NULL,
  `BillingState` varchar(50) DEFAULT NULL,
  `Password` varchar(12) DEFAULT NULL,
  `ConfirmPassword` varchar(12) DEFAULT NULL,
  `AccountType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AccNumber`)
) ENGINE=MyISAM AUTO_INCREMENT=543004 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customerinfo`
--

INSERT INTO `customerinfo` (`AccNumber`, `Title`, `FirstName`, `LastName`, `PhoneNumber`, `EmailAddress`, `DOB`, `DelStreetAddress`, `DelCity`, `DelPostcode`, `DelState`, `LPGCylinderRequire`, `PromotionalCode`, `IfCylinderExist`, `IfNewInstallation`, `NoticeOfCompletion`, `Suppliers`, `gasStartedDate`, `OwnOrRent`, `AgentOrLandLordName`, `AgentOrLandLordNumber`, `PromoteCode`, `FlybuysNumber`, `MiddleName`, `ConfirmEmail`, `MobileNumber`, `AfterHoursNumber`, `WorkNumber`, `SecondaryTitle`, `SecondaryFirstName`, `SecondaryLastName`, `SecondaryRelationship`, `SecondaryDOB`, `BillingStreetAddress`, `BillingSuburb`, `BillingPostcode`, `BillingState`, `Password`, `ConfirmPassword`, `AccountType`) VALUES
(543001, 'Mr', 'Yifeng', 'XU', '0430800531', 'armasxu531@hotmail.com', '31/05/1990', '7 Petra ST', 'East Fremantle', '6158', 'WA', 5, '', 'Yes', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'LPG');

-- --------------------------------------------------------

--
-- Table structure for table `cylinderreturns`
--

DROP TABLE IF EXISTS `cylinderreturns`;
CREATE TABLE IF NOT EXISTS `cylinderreturns` (
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) DEFAULT NULL,
  `PhoneNumber` varchar(10) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `AccNumber` varchar(10) DEFAULT NULL,
  `StreetAddress` varchar(100) DEFAULT NULL,
  `Surburb` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `Postcode` varchar(10) DEFAULT NULL,
  `PickUpInstructions` varchar(200) DEFAULT NULL,
  `NumberCylinder` int(100) DEFAULT NULL,
  PRIMARY KEY (`FirstName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `gasnoticeofcompletion`
--

DROP TABLE IF EXISTS `gasnoticeofcompletion`;
CREATE TABLE IF NOT EXISTS `gasnoticeofcompletion` (
  `Number` varchar(10) NOT NULL,
  `Owner` varchar(50) DEFAULT NULL,
  `BuilderName` varchar(50) DEFAULT NULL,
  `MeterNo` varchar(50) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Directions` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Number`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lpgregebill`
--

DROP TABLE IF EXISTS `lpgregebill`;
CREATE TABLE IF NOT EXISTS `lpgregebill` (
  `AccName` varchar(50) NOT NULL,
  `AccNumber` varchar(10) DEFAULT NULL,
  `DaytimePhoneNumber` varchar(10) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `StreetAddress` varchar(100) DEFAULT NULL,
  `Surburb` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `Postcode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`AccName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orderinfo`
--

DROP TABLE IF EXISTS `orderinfo`;
CREATE TABLE IF NOT EXISTS `orderinfo` (
  `OrderIDforCC` int(11) NOT NULL AUTO_INCREMENT,
  `OrderType` varchar(5) DEFAULT NULL,
  `NumOfCylinder` int(3) DEFAULT NULL,
  `OrderInfo` varchar(200) DEFAULT NULL,
  `AccNumber` int(11) DEFAULT NULL,
  `unitPrice` decimal(6,2) DEFAULT NULL,
  `subTotal` decimal(6,2) DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `discountPrice` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`OrderIDforCC`),
  KEY `par_ind` (`AccNumber`)
) ENGINE=MyISAM AUTO_INCREMENT=243005 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderinfo`
--

INSERT INTO `orderinfo` (`OrderIDforCC`, `OrderType`, `NumOfCylinder`, `OrderInfo`, `AccNumber`, `unitPrice`, `subTotal`, `total`, `discountPrice`) VALUES
(243001, 'LPG', 4, 'LPG Order', 543001, '45.92', '174.50', '157.05', '9.18'),
(243002, 'LPG', 4, 'LPG Order', 543001, '45.92', '174.50', '157.05', '9.18'),
(243003, 'LPG', 4, 'LPG Order', 543001, '45.92', '174.50', '157.05', '9.18'),
(243004, 'LPG', 4, 'LPG Order', 543001, '45.92', '174.50', '157.05', '9.18');

-- --------------------------------------------------------

--
-- Table structure for table `paymentinfo`
--

DROP TABLE IF EXISTS `paymentinfo`;
CREATE TABLE IF NOT EXISTS `paymentinfo` (
  `PaymentID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderID` int(11) DEFAULT NULL,
  `DirectDebitDate` int(2) DEFAULT NULL,
  `CardType` varchar(50) DEFAULT NULL,
  `CardNumber` varchar(50) DEFAULT NULL,
  `ExpMonth` varchar(2) DEFAULT NULL,
  `ExpYear` varchar(4) DEFAULT NULL,
  `CVVCode` varchar(4) DEFAULT NULL,
  `BSB` varchar(10) DEFAULT NULL,
  `ACC` varchar(10) DEFAULT NULL,
  `AccName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PaymentID`),
  KEY `par_ind` (`OrderID`)
) ENGINE=MyISAM AUTO_INCREMENT=943005 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paymentinfo`
--

INSERT INTO `paymentinfo` (`PaymentID`, `OrderID`, `DirectDebitDate`, `CardType`, `CardNumber`, `ExpMonth`, `ExpYear`, `CVVCode`, `BSB`, `ACC`, `AccName`) VALUES
(943001, 243001, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(943002, 243002, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(943003, 243003, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(943004, 243004, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
CREATE TABLE IF NOT EXISTS `promotion` (
  `PromoteCode` varchar(50) NOT NULL,
  `Discount` float DEFAULT NULL,
  PRIMARY KEY (`PromoteCode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`PromoteCode`, `Discount`) VALUES
('1010', 0.9);

-- --------------------------------------------------------

--
-- Table structure for table `validateaddress`
--

DROP TABLE IF EXISTS `validateaddress`;
CREATE TABLE IF NOT EXISTS `validateaddress` (
  `CorrectStreetAddress` varchar(100) NOT NULL,
  `Surburb` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `Postcode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CorrectStreetAddress`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `validateaddress`
--

INSERT INTO `validateaddress` (`CorrectStreetAddress`, `Surburb`, `State`, `Postcode`) VALUES
('12 high street', 'Fremantle', 'WA', '6160'),
('8 wood street', 'Fremantle', 'WA', '6160'),
('5 forrest street', 'Fremantle', 'WA', '6160'),
('10 south street', 'Murdoch', 'WA', '6150'),
('5 fiona street', 'Murdoch', 'WA', '6150'),
('10 discovery street', 'Murdoch', 'WA', '6150');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
