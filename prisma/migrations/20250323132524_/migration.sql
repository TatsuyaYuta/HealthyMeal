/*
  Warnings:

  - You are about to drop the `_allergytomenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_allergytouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `allergy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_allergytomenu` DROP FOREIGN KEY `_AllergyToMenu_A_fkey`;

-- DropForeignKey
ALTER TABLE `_allergytomenu` DROP FOREIGN KEY `_AllergyToMenu_B_fkey`;

-- DropForeignKey
ALTER TABLE `_allergytouser` DROP FOREIGN KEY `_AllergyToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_allergytouser` DROP FOREIGN KEY `_AllergyToUser_B_fkey`;

-- DropTable
DROP TABLE `_allergytomenu`;

-- DropTable
DROP TABLE `_allergytouser`;

-- DropTable
DROP TABLE `allergy`;
