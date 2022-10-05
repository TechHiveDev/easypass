/*
  Warnings:

  - Added the required column `compoundId` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Scan` DROP FOREIGN KEY `Scan_userId_fkey`;

-- AlterTable
ALTER TABLE `Scan` ADD COLUMN `compoundId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Scan` ADD CONSTRAINT `Scan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scan` ADD CONSTRAINT `Scan_compoundId_fkey` FOREIGN KEY (`compoundId`) REFERENCES `Compound`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
