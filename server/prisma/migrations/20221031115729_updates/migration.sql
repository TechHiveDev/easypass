/*
  Warnings:

  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `requestNote` on the `Request` table. All the data in the column will be lost.
  - The values [Declined,InProgress,Accepted] on the enum `Request_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Facility` DROP FOREIGN KEY `Facility_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `Facility` DROP COLUMN `address`,
    DROP COLUMN `categoryId`,
    DROP COLUMN `shortDescription`;

-- AlterTable
ALTER TABLE `Request` DROP COLUMN `requestNote`,
    MODIFY `status` ENUM('Pending', 'Completed', 'Cancelled', 'Done') NOT NULL DEFAULT 'Pending';
