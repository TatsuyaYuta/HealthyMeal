/*
  Warnings:

  - You are about to drop the `patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_userId_fkey`;

-- DropTable
DROP TABLE `patient`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Food` (
    `id` VARCHAR(191) NOT NULL,
    `foodName` VARCHAR(191) NOT NULL,
    `category` ENUM('MEAL', 'APPETIZER', 'DESSERT', 'SALAD', 'DRINK') NOT NULL,
    `ingredients` JSON NOT NULL,
    `ratings` DOUBLE NOT NULL,
    `nutrition` JSON NOT NULL,
    `calories` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
