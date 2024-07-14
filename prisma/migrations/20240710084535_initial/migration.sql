/*
  Warnings:

  - You are about to drop the column `technologyRead` on the `TechnologyKnown` table. All the data in the column will be lost.
  - You are about to drop the column `technologySpeak` on the `TechnologyKnown` table. All the data in the column will be lost.
  - You are about to drop the column `technologyWrite` on the `TechnologyKnown` table. All the data in the column will be lost.
  - Added the required column `skillLevel` to the `TechnologyKnown` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TechnologyKnown` DROP COLUMN `technologyRead`,
    DROP COLUMN `technologySpeak`,
    DROP COLUMN `technologyWrite`,
    ADD COLUMN `skillLevel` VARCHAR(191) NOT NULL;
