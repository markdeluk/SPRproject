CREATE TABLE `paymentmethod` (
  `PID` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `number` char(16) NOT NULL,
  `expireDate` date NOT NULL,
  `cvc` char(3) NOT NULL
) 


CREATE TABLE `spr`.`cost` (
`monthNumber` INT NOT NULL , 
`year` INT NOT NULL , 
`BID` INT NOT NULL , 
`costDay` DOUBLE NOT NULL , 
`costWeek` DOUBLE NOT NULL , 
`costMonth` DOUBLE NOT NULL , 
`taxesPercentage` DOUBLE NOT NULL , 
`isValid` BIT NOT NULL )


CREATE TABLE `spr`.`credentials` (
`username` CHAR NOT NULL , 
`password` CHAR NOT NULL , 
`lastlogin` TIMESTAMP NOT NULL )

CREATE TABLE `spr`.`image` (
`type` INT NOT NULL , 
`BID` INT NOT NULL , 
`bytearray` VARBINARY(100) NULL ) 

CREATE TABLE `spr`.`lending` (
`UID` INT NOT NULL , 
`startTimestamp` TIMESTAMP NOT NULL , 
`BID` INT NOT NULL , 
`totalEarning` DOUBLE NOT NULL ) 

CREATE TABLE `spr`.`login` (
`UID` INT NOT NULL , 
`timestamp` TIMESTAMP NOT NULL , 
`username` CHAR NOT NULL ) 

CREATE TABLE `spr`.`pointsofinterest` (
`posID` INT NOT NULL , 
`numberOfBikes` INT NOT NULL ) 

CREATE TABLE `spr`.`position` (
`posID` INT NOT NULL ,
`latitude` INT NOT NULL , 
`longitude` INT NOT NULL )

CREATE TABLE `spr`.`renting` (
`startTimestamp` TIMESTAMP NOT NULL , 
`BID` INT NOT NULL , 
`endTImeStamp` TIMESTAMP NOT NULL , 
`UID` INT NOT NULL , 
`isReserved` INT NOT NULL , 
`reservationTime` INT NOT NULL , 
`feedback` INT NOT NULL , 
`PID` INT NOT NULL , 
`startPosID` INT NOT NULL , 
`endPosID` INT NOT NULL , 
`totalCost` DOUBLE NOT NULL )  

CREATE TABLE `spr`.`reservationcost` (
`hour` INT NOT NULL , 
`cost` DOUBLE NOT NULL ) 

CREATE TABLE `spr`.`user` (`UID` INT NOT NULL , 
`name` CHAR NOT NULL , 
`surname` CHAR NOT NULL , 
`mail` CHAR NOT NULL , 
`favouritePID` INT NOT NULL , 
`rentingTotalCost` DOUBLE NOT NULL , 
`lendingTotalEarning` DOUBLE NOT NULL , 
`balance` DOUBLE NOT NULL ) 

CREATE TABLE `bike` (
  `BID` int(11) NOT NULL,
  `ownerUID` int(100) NOT NULL,
  `name` char(20) NOT NULL,
  `type` char(50) NOT NULL,
  `notes` char(200) NOT NULL,
  `model` char(50) NOT NULL,
  `size` char(100) NOT NULL,
  `wheels` char(100) NOT NULL,
  `initialPosID` int(100) NOT NULL,
  `status` int(1) NOT NULL,
  `isDamaged` bit(1) NOT NULL,
  `lastUsage` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `lastPosID` int(100) NOT NULL,
  `lockingCode` int(4) NOT NULL,
  `city` char(50) NOT NULL,
  PRIMARY KEY (`BID`),
  KEY `fk_ownerUID` (`ownerUID`),
  KEY `fk_initialPosID` (`initialPosID`),
  KEY `fk_lastPosID` (`lastPosID`),
  CONSTRAINT `fk_initialPosID` FOREIGN KEY (`initialPosID`) REFERENCES `position` (`posID`),
  CONSTRAINT `fk_lastPosID` FOREIGN KEY (`lastPosID`) REFERENCES `position` (`posID`)
)

---CREATION PRIMARY KEY
ALTER TABLE `paymentmethod` ADD PRIMARY KEY(`PID`);
ALTER TABLE `user` ADD PRIMARY KEY(`UID`);
ALTER TABLE `position` ADD PRIMARY KEY(`posID`);
ALTER TABLE `bike` ADD PRIMARY KEY(`BID');
ALTER TABLE `renting` ADD PRIMARY KEY(`startTimestamp`, `BID`);
ALTER TABLE `credentials` ADD PRIMARY KEY(`username`);
ALTER TABLE `cost` ADD PRIMARY KEY(`monthNumber`);
ALTER TABLE `cost`ADD PRIMARY KEY(`monthNumber`,`year`);
ALTER TABLE `reservationcost` ADD PRIMARY KEY(`hour`);





---CREATION FOREIGN KEY
ALTER TABLE `user` ADD CONSTRAINT `FK_favouritePID` FOREIGN KEY (`favouritePID`) REFERENCES `paymentmethod`(`PID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `pointsofinterest` ADD CONSTRAINT `FK_posID` FOREIGN KEY (`posID`) REFERENCES `position`(`posID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `bike` ADD CONSTRAINT `fk_ownerUID` FOREIGN KEY (`ownerUID`) REFERENCES `user`(`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `bike` DROP FOREIGN KEY `fk_ownerUID`; ALTER TABLE `bike` ADD CONSTRAINT `fk_initialPosID` FOREIGN KEY (`initialPosID`) REFERENCES `position`(`posID`) ON DELETE RESTRICT ON UPDATE RESTRICT; 
ALTER TABLE `bike` ADD CONSTRAINT `fk_lastPosID` FOREIGN KEY (`lastPosID`) REFERENCES `position`(`posID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `chat` ADD CONSTRAINT `fk_receiverUID` FOREIGN KEY (`receiverUID`) REFERENCES `user`(`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `login` ADD PRIMARY KEY(`timestamp`);
ALTER TABLE `login` ADD CONSTRAINT `fk_UID` FOREIGN KEY (`UID`) REFERENCES `user`(`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `renting` ADD CONSTRAINT `fk_BID` FOREIGN KEY (`BID`) REFERENCES `bike`(`BID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `chat` ADD CONSTRAINT `fk_senderUID` FOREIGN KEY (`senderUID`) REFERENCES `user`(`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `image` ADD CONSTRAINT `fk_BID` FOREIGN KEY (`BID`) REFERENCES `bike`(`BID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `lending` ADD CONSTRAINT `fk_UID` FOREIGN KEY (`UID`) REFERENCES `user`(`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT; 
ALTER TABLE `lending` ADD CONSTRAINT `fk_BID` FOREIGN KEY (`BID`) REFERENCES `bike`(`BID`) ON DELETE RESTRICT ON UPDATE RESTRICT;




--ALTER DEFAULT
ALTER TABLE `user` CHANGE `rentingTotalCost` `rentingTotalCost` DOUBLE NOT NULL DEFAULT '0';
ALTER TABLE `user` CHANGE `lendingTotalEarning` `lendingTotalEarning` DOUBLE NOT NULL DEFAULT '0';
ALTER TABLE `user` CHANGE `balance` `balance` DOUBLE NULL DEFAULT '0';
ALTER TABLE `user` CHANGE `favouritePID` `favouritePID` INT(11) NOT NULL DEFAULT '0';



---DEFAULT VALUES
INSERT INTO `paymentmethod` (`PID`, `type`, `number`, `expireDate`, `cvc`) VALUES ('0', '0', '0000000000000000', '', '000');