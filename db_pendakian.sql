-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: db_pendakian
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blacklists`
--

DROP TABLE IF EXISTS `blacklists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklists` (
  `id` varchar(36) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `no_telepon` varchar(255) NOT NULL,
  `dibuat` varchar(255) NOT NULL,
  `berakhir` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklists`
--

LOCK TABLES `blacklists` WRITE;
/*!40000 ALTER TABLE `blacklists` DISABLE KEYS */;
INSERT INTO `blacklists` VALUES ('52d450dd-fe6a-4274-b60d-16464ea9d5bc','133','fajri','089','2023-11-24','2023-12-01','2023-11-24 16:01:02.913587','2023-11-24 16:01:02.913587'),('8160dbe0-f947-4b34-9bac-880064893d81','123','agus','088','2023-11-24','2023-11-01','2023-11-24 15:58:37.723029','2023-11-24 15:58:37.723029');
/*!40000 ALTER TABLE `blacklists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` varchar(36) NOT NULL,
  `kode_booking` varchar(255) DEFAULT NULL,
  `jalur` varchar(255) DEFAULT NULL,
  `tanggal_naik` varchar(255) DEFAULT NULL,
  `tanggal_turun` varchar(255) DEFAULT NULL,
  `nama_ketua` varchar(255) DEFAULT NULL,
  `alamat_ketua` varchar(255) DEFAULT NULL,
  `no_identitas_ketua` varchar(255) DEFAULT NULL,
  `no_telepone_ketua` varchar(255) DEFAULT NULL,
  `tempat_lahir_ketua` varchar(255) DEFAULT NULL,
  `tanggal_lahir_ketua` varchar(255) DEFAULT NULL,
  `jenis_kelamin_ketua` varchar(255) DEFAULT NULL,
  `no_kontak_darurat_ketua` varchar(255) DEFAULT NULL,
  `anggota` json DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `naik` tinyint NOT NULL DEFAULT '0',
  `turun` tinyint NOT NULL DEFAULT '0',
  `tarif` int DEFAULT NULL,
  `rombongan` float DEFAULT NULL,
  `bukti_pembayaran` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kuotas`
--

DROP TABLE IF EXISTS `kuotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kuotas` (
  `id` varchar(36) NOT NULL,
  `tanggal` varchar(255) DEFAULT NULL,
  `kuota` float DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kuotas`
--

LOCK TABLES `kuotas` WRITE;
/*!40000 ALTER TABLE `kuotas` DISABLE KEYS */;
INSERT INTO `kuotas` VALUES ('0066744b-c149-49fd-bf16-6c6511a9b978','2023-11-05',150,'2023-11-24 17:09:42.833418','2023-11-24 17:09:42.833418'),('01a34901-2863-4cbc-b9e5-c2579d10569b','2023-12-18',150,'2023-11-24 17:37:45.914465','2023-11-24 17:37:45.914465'),('023dd99a-8182-4b1d-af8e-63685b469369','2023-11-13',150,'2023-11-24 17:09:42.883760','2023-11-24 17:09:42.883760'),('0492de2a-dfd2-44ee-b116-ce8bd89dd891','2023-11-06',150,'2023-11-24 17:09:42.839720','2023-11-24 17:09:42.839720'),('04dd4ccd-078d-4fe1-a9a9-c9212b47fb9a','2023-11-26',150,'2023-11-24 17:09:42.951446','2023-11-24 17:09:42.951446'),('091d8e4f-ae04-4989-913b-ea2dd6900ff8','2023-11-30',150,'2023-11-24 17:09:42.970347','2023-11-24 17:09:42.970347'),('0f4721f7-fa40-401c-aef1-fa7c3ef9cbf8','2023-11-17',150,'2023-11-24 17:09:42.905199','2023-11-24 17:09:42.905199'),('15c2c56c-4118-4f4e-9117-407b61b82d48','2023-11-23',150,'2023-11-24 17:09:42.937000','2023-11-24 17:09:42.937000'),('18856ca8-8609-4915-aff3-9a33900053f6','2023-11-27',150,'2023-11-24 17:09:42.955814','2023-11-24 17:09:42.955814'),('1aac90fd-f819-40ca-9702-f6ce5bd890d1','2023-12-30',150,'2023-11-24 17:37:45.962019','2023-11-24 17:37:45.962019'),('1e708b19-2737-42d6-8888-53a2b0215ae5','2023-11-02',150,'2023-11-24 17:09:42.814069','2023-11-24 17:09:42.814069'),('2ed467a7-078d-4e13-b1a8-db6d1d293629','2023-12-31',150,'2023-11-24 17:37:45.965489','2023-11-24 17:37:45.965489'),('345d245b-086b-4fc8-8ea3-7fc86cb2ceec','2023-12-26',150,'2023-11-24 17:37:45.947042','2023-11-24 17:37:45.947042'),('35b747df-3550-4098-a276-f9d18793451e','2023-11-01',150,'2023-11-24 17:09:42.804065','2023-11-24 17:09:42.804065'),('42edbe7e-d68c-413e-b3de-c15b7629884f','2023-11-03',150,'2023-11-24 17:09:42.820211','2023-11-24 17:09:42.820211'),('4b0738e7-a8f3-4447-a792-10dd512be789','2023-11-22',150,'2023-11-24 17:09:42.931960','2023-11-24 17:09:42.931960'),('4fd782f8-fc00-4099-8de1-cdfe68d6de4f','2023-11-07',150,'2023-11-24 17:09:42.846810','2023-11-24 17:09:42.846810'),('50673e04-ed23-4ea1-8e23-9f642ebc9025','2023-11-11',150,'2023-11-24 17:09:42.871443','2023-11-24 17:09:42.871443'),('57b7d433-4f03-41cd-8fa7-c196d3ac1c6d','2023-12-27',150,'2023-11-24 17:37:45.950553','2023-11-24 17:37:45.950553'),('5d97602c-fb5a-4de5-9970-39babda0d078','2023-12-12',150,'2023-11-24 17:37:45.889551','2023-11-24 17:37:45.889551'),('5e80e1e2-7fc1-4deb-9017-de3b9e50bc2f','2023-11-09',150,'2023-11-24 17:09:42.858002','2023-11-24 17:09:42.858002'),('5ef827df-e3b9-4418-b2aa-f263f9f44691','2023-11-21',150,'2023-11-24 17:09:42.926983','2023-11-24 17:09:42.926983'),('60ed093d-1031-458d-9989-d0ada19ce6ac','2023-12-11',150,'2023-11-24 17:37:45.885450','2023-11-24 17:37:45.885450'),('629a0472-ad32-4aef-8e64-393a00275580','2023-11-15',150,'2023-11-24 17:09:42.895991','2023-11-24 17:09:42.895991'),('6f0f2075-49e7-4bb8-b6a0-7fa52fe1900a','2023-12-14',150,'2023-11-24 17:37:45.898161','2023-11-24 17:37:45.898161'),('72c20eb5-b175-4b7e-8c21-a82e44975999','2023-11-10',150,'2023-11-24 17:09:42.865893','2023-11-24 17:09:42.865893'),('7c1478ce-9478-4eec-b448-2f05e80511e6','2023-12-07',150,'2023-11-24 17:37:45.866860','2023-11-24 17:37:45.866860'),('80288d35-1846-4f9d-94f5-0b9cf6deb11d','2023-12-29',150,'2023-11-24 17:37:45.957733','2023-11-24 17:37:45.957733'),('806ed8cb-935c-41b2-96a5-fc229d189ab2','2023-12-15',150,'2023-11-24 17:37:45.902029','2023-11-24 17:37:45.902029'),('852f77cd-d183-43f2-8a45-1bcec8d89c5b','2023-11-28',150,'2023-11-24 17:09:42.962186','2023-11-24 17:09:42.962186'),('8a46d999-a83a-47a1-808c-a8792c2ae919','2023-12-24',150,'2023-11-24 17:37:45.939189','2023-11-24 17:37:45.939189'),('91578859-1ba9-48b8-ac5a-a44af50bacdf','2023-12-28',150,'2023-11-24 17:37:45.954100','2023-11-24 17:37:45.954100'),('991122dd-7a89-4cd8-9af0-2ca45c5ac04e','2023-11-29',150,'2023-11-24 17:09:42.966547','2023-11-24 17:09:42.966547'),('a544394a-832e-495d-8e35-5916c8b755da','2023-12-02',150,'2023-11-24 17:37:45.844784','2023-11-24 17:37:45.844784'),('a6d52dee-0b7e-446d-8370-b0734f09c062','2023-12-22',150,'2023-11-24 17:37:45.931569','2023-11-24 17:37:45.931569'),('aa33ac6d-a8fe-45af-ba96-d3635ede2756','2023-11-08',150,'2023-11-24 17:09:42.851722','2023-11-24 17:09:42.851722'),('b00c03d7-3901-4b30-97fb-244f5aad4483','2023-12-01',150,'2023-11-24 17:37:45.836932','2023-11-24 17:37:45.836932'),('b27bb571-ce00-432a-845a-aa7a6f657e1d','2023-11-16',150,'2023-11-24 17:09:42.900665','2023-11-24 17:09:42.900665'),('b71ef1ef-5154-479e-9dad-9b912655035c','2023-12-19',150,'2023-11-24 17:37:45.917979','2023-11-24 17:37:45.917979'),('bf561976-2215-4f49-9737-f9b77dd4fabe','2023-11-04',150,'2023-11-24 17:09:42.826340','2023-11-24 17:09:42.826340'),('bfa76ce5-434c-493c-99f5-3e5ca99f0559','2023-12-25',150,'2023-11-24 17:37:45.943039','2023-11-24 17:37:45.943039'),('cc1e90cb-9d88-4a36-a7db-3fa2e32e6ff5','2023-12-10',150,'2023-11-24 17:37:45.881104','2023-11-24 17:37:45.881104'),('ccf5d6f4-af15-4104-8f8e-9e080386b22a','2023-12-16',150,'2023-11-24 17:37:45.905957','2023-11-24 17:37:45.905957'),('d17a0e8f-a68c-46b2-b9a9-b8b2c9577bfe','2023-11-18',150,'2023-11-24 17:09:42.911000','2023-11-24 17:09:42.911000'),('d7e51b13-ceb6-4db8-ae83-4f305a641fb5','2023-11-12',150,'2023-11-24 17:09:42.879113','2023-11-24 17:09:42.879113'),('d95962e0-09b3-431f-bde3-d3d2ce12d130','2023-12-13',150,'2023-11-24 17:37:45.894046','2023-11-24 17:37:45.894046'),('d9783acc-ce57-448a-b6bc-93a83a7951da','2023-11-19',150,'2023-11-24 17:09:42.916333','2023-11-24 17:09:42.916333'),('da9926e5-70e8-4bbb-91ad-95c4ff7c4ca1','2023-12-17',150,'2023-11-24 17:37:45.910607','2023-11-24 17:37:45.910607'),('da9a6ae7-5065-4b92-88a4-429f900e13e4','2023-12-03',150,'2023-11-24 17:37:45.849399','2023-11-24 17:37:45.849399'),('db260781-8433-4171-bad9-74c6da46ba55','2023-12-08',150,'2023-11-24 17:37:45.870761','2023-11-24 17:37:45.870761'),('e1b1f6f7-f90a-4f33-a3b8-7fa43b10b595','2023-11-14',150,'2023-11-24 17:09:42.889357','2023-11-24 17:09:42.889357'),('f1003404-a061-4883-8665-d9b6a9cc486d','2023-12-21',150,'2023-11-24 17:37:45.926876','2023-11-24 17:37:45.926876'),('f2e4038c-b740-4ada-95a5-9efb0619dd87','2023-11-20',150,'2023-11-24 17:09:42.921207','2023-11-24 17:09:42.921207'),('f3333561-fb5f-4aba-80e7-35ae890a35f5','2023-12-20',150,'2023-11-24 17:37:45.921362','2023-11-24 17:37:45.921362'),('f3403fa6-0cee-4581-8d7c-14439c7c216a','2023-11-25',150,'2023-11-24 17:09:42.947388','2023-11-24 17:09:42.947388'),('f3799a6c-7c6f-4784-b93b-84a26db798b2','2023-11-24',138,'2023-11-24 17:09:42.941631','2023-11-24 20:44:07.000000'),('f6d69df6-8211-452e-b1c9-058477fd648c','2023-12-23',150,'2023-11-24 17:37:45.935641','2023-11-24 17:37:45.935641'),('f72381bd-c4a3-4026-a9f1-f2d322aefc7d','2023-12-04',150,'2023-11-24 17:37:45.853799','2023-11-24 17:37:45.853799'),('f980de70-b6dd-4800-8179-3771646c2ff6','2023-12-05',150,'2023-11-24 17:37:45.857799','2023-11-24 17:37:45.857799'),('fc8aa9a5-9da8-4571-a63e-48eb0f3c0c44','2023-12-09',150,'2023-11-24 17:37:45.875494','2023-11-24 17:37:45.875494'),('fd78f809-c9dc-47f8-92a5-fab751d4ca2b','2023-12-06',150,'2023-11-24 17:37:45.862578','2023-11-24 17:37:45.862578');
/*!40000 ALTER TABLE `kuotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'admin',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('514a0da0-489d-4bf0-8fe9-3dd3fb0d101a','admin','admin@gmail.com','$2a$10$c0gOM/iJ.ZNC.3BrbwyNJeBWKzISAxOmbuvLfk5E1gsl9pUnlkZWS','admin','2023-11-24 15:50:51.306694','2023-11-24 15:50:51.306694');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `websites`
--

DROP TABLE IF EXISTS `websites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `websites` (
  `id` varchar(36) NOT NULL,
  `status_pendaftaran` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `websites`
--

LOCK TABLES `websites` WRITE;
/*!40000 ALTER TABLE `websites` DISABLE KEYS */;
INSERT INTO `websites` VALUES ('a0dcabc3-0dbc-4550-bc77-f518b30fefa9',1,'2023-11-24 15:47:51.631100','2023-11-24 16:11:42.000000');
/*!40000 ALTER TABLE `websites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-24 20:53:21
