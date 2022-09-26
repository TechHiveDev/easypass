/*
  Warnings:

  - Added the required column `type` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Scan` ADD COLUMN `type` ENUM('SuperAdmin', 'Admin', 'Resident', 'Security') NOT NULL;
