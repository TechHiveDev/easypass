-- AlterTable
ALTER TABLE `Request` ADD COLUMN `adminSeen` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `seen` BOOLEAN NOT NULL DEFAULT true;
