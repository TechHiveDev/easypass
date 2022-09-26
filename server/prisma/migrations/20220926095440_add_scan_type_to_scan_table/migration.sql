/*
  Warnings:

  - The values [SuperAdmin,Admin,Security] on the enum `Scan_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Scan` MODIFY `type` ENUM('Resident', 'Visitor', 'Delivery') NOT NULL;
