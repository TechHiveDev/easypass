/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Request` table. All the data in the column will be lost.
  - The values [Refused,Done] on the enum `Request_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Request` DROP COLUMN `createdAt`,
    ADD COLUMN `adminRefusedAt` DATETIME(3) NULL,
    ADD COLUMN `cancelledAt` DATETIME(3) NULL,
    ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `inProgressAt` DATETIME(3) NULL,
    ADD COLUMN `pendingAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `seen` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `status` ENUM('Pending', 'Cancelled', 'AdminRefused', 'InProgress', 'Completed') NOT NULL DEFAULT 'Pending';
