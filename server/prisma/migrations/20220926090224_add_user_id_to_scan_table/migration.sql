/*
  Warnings:

  - Added the required column `userId` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Scan` DROP FOREIGN KEY `Scan_invitationId_fkey`;

-- AlterTable
ALTER TABLE `Scan` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `invitationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Scan` ADD CONSTRAINT `Scan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scan` ADD CONSTRAINT `Scan_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `Invitation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
