-- CreateTable
CREATE TABLE `crop_field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leket_farmer_id` VARCHAR(191) NOT NULL,
    `leket_coordinates` JSON NOT NULL,
    `up_date` DATETIME(3) NOT NULL,
    `yeshuv_name` VARCHAR(191) NOT NULL,
    `moatza` VARCHAR(191) NOT NULL,
    `geo_district_name` VARCHAR(191) NOT NULL,
    `growth_cat` VARCHAR(191) NOT NULL,
    `anaf_name` VARCHAR(191) NOT NULL,
    `growth_id` VARCHAR(191) NOT NULL,
    `growth_name` VARCHAR(191) NOT NULL,
    `dunam` DOUBLE NOT NULL,
    `growth_type` VARCHAR(191) NOT NULL,
    `parcel_type` VARCHAR(191) NOT NULL,
    `cover_type` VARCHAR(191) NOT NULL,
    `organic` VARCHAR(191) NOT NULL,
    `water_type` VARCHAR(191) NOT NULL,
    `global_id` VARCHAR(191) NOT NULL,
    `anaf_sub` VARCHAR(191) NOT NULL,
    `shape_length` DOUBLE NOT NULL,
    `shape_area` DOUBLE NOT NULL,
    `geometry` JSON NOT NULL,

    UNIQUE INDEX `crop_field_leket_farmer_id_key`(`leket_farmer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ndvi_metrics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `crop_field_id` INTEGER NOT NULL,
    `datetime` DATETIME(3) NOT NULL,
    `max_ndvi` DOUBLE NOT NULL,
    `mean_ndvi` DOUBLE NOT NULL,
    `median_ndvi` DOUBLE NOT NULL,
    `min_ndvi` DOUBLE NOT NULL,
    `ndvi_like` BOOLEAN NOT NULL,

    UNIQUE INDEX `ndvi_metrics_crop_field_id_key`(`crop_field_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attractiveness_metrics` (
    `id` INTEGER NOT NULL,
    `growth_id` INTEGER NOT NULL,
    `datetime` DATETIME(3) NOT NULL,
    `attractiveness_score` DOUBLE NOT NULL,
    `attractiveness_like` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `farmer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `market` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `price_id` INTEGER NOT NULL,
    `anaf` VARCHAR(191) NOT NULL,
    `genus` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `quality` VARCHAR(191) NOT NULL,
    `average_price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `leket_farmer_id` VARCHAR(191) NOT NULL,
    `product_amount_kg` DOUBLE NOT NULL,
    `product_type` VARCHAR(191) NOT NULL,
    `source_call_id` INTEGER NOT NULL,
    `source_call_desc` VARCHAR(191) NOT NULL,
    `basic_feature_id` INTEGER NOT NULL,
    `basic_feature_desc` VARCHAR(191) NOT NULL,
    `ripe` BOOLEAN NOT NULL,
    `not_picked_desc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `crop_field` ADD CONSTRAINT `crop_field_leket_farmer_id_fkey` FOREIGN KEY (`leket_farmer_id`) REFERENCES `farmer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ndvi_metrics` ADD CONSTRAINT `ndvi_metrics_crop_field_id_fkey` FOREIGN KEY (`crop_field_id`) REFERENCES `crop_field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_leket_farmer_id_fkey` FOREIGN KEY (`leket_farmer_id`) REFERENCES `farmer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
