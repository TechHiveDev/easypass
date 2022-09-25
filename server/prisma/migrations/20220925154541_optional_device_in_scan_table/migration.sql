-- DropForeignKey
ALTER TABLE `Scan` DROP FOREIGN KEY `Scan_deviceId_fkey`;

-- AlterTable
ALTER TABLE `Scan` MODIFY `deviceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Scan` ADD CONSTRAINT `Scan_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
