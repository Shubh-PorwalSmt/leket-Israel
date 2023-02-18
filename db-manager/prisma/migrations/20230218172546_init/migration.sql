/*
  Warnings:

  - You are about to drop the `attractiveness_metrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ndvi_metrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ndvi_metrics` DROP FOREIGN KEY `ndvi_metrics_crop_field_id_fkey`;

-- DropTable
DROP TABLE `attractiveness_metrics`;

-- DropTable
DROP TABLE `ndvi_metrics`;

-- CreateTable
CREATE TABLE `ndvi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `crop_field_id` INTEGER NOT NULL,
    `datetime` DATETIME(3) NOT NULL,
    `max` DOUBLE NOT NULL,
    `mean` DOUBLE NOT NULL,
    `median` DOUBLE NOT NULL,
    `min` DOUBLE NOT NULL,
    `ndvi` BOOLEAN NOT NULL,

    UNIQUE INDEX `ndvi_crop_field_id_key`(`crop_field_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attractiveness` (
    `id` INTEGER NOT NULL,
    `growth_id` INTEGER NOT NULL,
    `growth_name` VARCHAR(191) NOT NULL,
    `datetime` DATETIME(3) NOT NULL,
    `leket_score` DOUBLE NOT NULL,
    `prices_score` DOUBLE NOT NULL,
    `average_score` DOUBLE NOT NULL,
    `like` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ndvi` ADD CONSTRAINT `ndvi_crop_field_id_fkey` FOREIGN KEY (`crop_field_id`) REFERENCES `crop_field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
