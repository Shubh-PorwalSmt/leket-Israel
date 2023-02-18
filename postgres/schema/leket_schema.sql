/* This is an old schema, for new one relate to prisma schema */
CREATE TABLE "crop" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "leket_id" int
);

CREATE TABLE "city" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "container" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "region" (
  "id" [PK],
  "name" varchar
);

CREATE TABLE "field_location" (
  "id" int PRIMARY KEY,
  "polygon" wkb,
  "city" int,
  "region" int
);

CREATE TABLE "farmer_crop_field" (
  "id" int PRIMARY KEY,
  "leket_farmer_id" varchar,
  "crop" int,
  "field_location" int,
  "entry_datetime" datetime
);

CREATE TABLE "ripeness" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "attractiveness" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "crop_field_history" (
  "id" int PRIMARY KEY,
  "farmer_crop_field" int,
  "ndvi" float,
  "ripe_factor" int,
  "attractive_factor" int,
  "entry_datetime" datetime
);

CREATE TABLE "crop_container" (
  "id" int PRIMARY KEY,
  "crop_id" int,
  "container_id" int
);

CREATE TABLE "crop_field_history_feedback" (
  "id" int PRIMARY KEY,
  "crop_field_history_id" int,
  "ripe_factor_feedback" varchar,
  "attractive_factor_feedback" varchar
);

ALTER TABLE "city" ADD FOREIGN KEY ("id") REFERENCES "field_location" ("city");

ALTER TABLE "region" ADD FOREIGN KEY ("id") REFERENCES "field_location" ("region");

ALTER TABLE "field_location" ADD FOREIGN KEY ("id") REFERENCES "farmer_crop_field" ("field_location");

ALTER TABLE "crop" ADD FOREIGN KEY ("id") REFERENCES "farmer_crop_field" ("crop");

ALTER TABLE "farmer_crop_field" ADD FOREIGN KEY ("id") REFERENCES "crop_field_history" ("farmer_crop_field");

ALTER TABLE "ripeness" ADD FOREIGN KEY ("id") REFERENCES "crop_field_history" ("ripe_factor");

ALTER TABLE "attractiveness" ADD FOREIGN KEY ("id") REFERENCES "crop_field_history" ("attractive_factor");

ALTER TABLE "crop" ADD FOREIGN KEY ("id") REFERENCES "crop_container" ("crop_id");

ALTER TABLE "container" ADD FOREIGN KEY ("id") REFERENCES "crop_container" ("container_id");

ALTER TABLE "crop_field_history" ADD FOREIGN KEY ("id") REFERENCES "crop_field_history_feedback" ("crop_field_history_id");
