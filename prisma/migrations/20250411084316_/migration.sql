/*
  Warnings:

  - Made the column `website` on table `restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `restaurant` MODIFY `website` VARCHAR(100) NOT NULL;
