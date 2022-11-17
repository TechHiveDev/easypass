-- AlterTable
ALTER TABLE `request` MODIFY `status` ENUM('Pending', 'Completed', 'Cancelled', 'Refused', 'Done') NOT NULL DEFAULT 'Pending';
