/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `Facility` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Facility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Facility` DROP COLUMN `photoUrl`,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL;
