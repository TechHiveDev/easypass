-- CreateTable
CREATE TABLE `Discover` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `photoUrl` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `compoundId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Discover` ADD CONSTRAINT `Discover_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discover` ADD CONSTRAINT `Discover_compoundId_fkey` FOREIGN KEY (`compoundId`) REFERENCES `Compound`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
