-- CreateTable
CREATE TABLE `BasicDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(191) NOT NULL,
    `lname` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `address1` VARCHAR(191) NOT NULL,
    `address2` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `dob` DATE NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `BasicDetails_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseName` VARCHAR(191) NULL,
    `school` VARCHAR(191) NULL,
    `year` DATE NOT NULL,
    `percentage` VARCHAR(191) NOT NULL,
    `basicDetailsId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LanguageKnown` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `languageName` VARCHAR(191) NOT NULL,
    `languageRead` BOOLEAN NOT NULL,
    `languageWrite` BOOLEAN NOT NULL,
    `languageSpeak` BOOLEAN NOT NULL,
    `basicDetailsId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `noticePeriod` INTEGER NOT NULL,
    `expectedCtc` VARCHAR(191) NOT NULL,
    `currentCtc` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `basicDetailsId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refName` VARCHAR(191) NOT NULL,
    `refContact` VARCHAR(191) NOT NULL,
    `refRelation` VARCHAR(191) NOT NULL,
    `basicDetailsId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TechnologyKnown` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `technologyName` VARCHAR(191) NOT NULL,
    `technologyRead` BOOLEAN NOT NULL,
    `technologyWrite` BOOLEAN NOT NULL,
    `technologySpeak` BOOLEAN NOT NULL,
    `basicDetailsId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkExperience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `from` DATE NOT NULL,
    `to` DATE NOT NULL,
    `basicDetailsId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EducationDetails` ADD CONSTRAINT `EducationDetails_basicDetailsId_fkey` FOREIGN KEY (`basicDetailsId`) REFERENCES `BasicDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LanguageKnown` ADD CONSTRAINT `LanguageKnown_basicDetailsId_fkey` FOREIGN KEY (`basicDetailsId`) REFERENCES `BasicDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preferences` ADD CONSTRAINT `Preferences_basicDetailsId_fkey` FOREIGN KEY (`basicDetailsId`) REFERENCES `BasicDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_basicDetailsId_fkey` FOREIGN KEY (`basicDetailsId`) REFERENCES `BasicDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TechnologyKnown` ADD CONSTRAINT `TechnologyKnown_basicDetailsId_fkey` FOREIGN KEY (`basicDetailsId`) REFERENCES `BasicDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkExperience` ADD CONSTRAINT `WorkExperience_basicDetailsId_fkey` FOREIGN KEY (`basicDetailsId`) REFERENCES `BasicDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
