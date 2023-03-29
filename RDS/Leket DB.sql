CREATE TYPE product AS ENUM (
'אבוקדו',
'אבטיח',
'אגוזי פקאן',
'אגס',
'אננס',
'אפרסמון',
'אפרסק',
'קינרס (ארטישוק)',
'אשכולית',
'בזיל',
'בטטה',
'בננות',
'בצל ירוק',
'בצל',
'ברוקולי',
'גויבות',
'גזר',
'דובדבן',
'דלורית',
'דלעת',
'חבוש',
'חימצה',
'חסה',
'חציל',
'כוסברה',
'כרוב',
'כרובית',
'לוביה',
'לוף',
'לימון',
'ליצי',
'לפת',
'מלון',
'מלפפון',
'מנגו',
'משמש',
'מנדרינה',
'נקטרינה',
'סלק',
'סלרי',
'עגבניות',
'עגבניות שרי',
'עלי סלק (מנגולד)',
'ענב',
'פומלה',
'פומלית',
'פטרוזיליה',
'פטריות',
'פלפל חריף',
'פלפל',
'פסיפלורה',
'פפאיה',
'צבר',
'צנון',
'צנוניות',
'קולורבי',
'קיווי',
'קשוא',
'קליפים (קלמנטינה)',
'קרמבולה',
'רימון',
'שום',
'שום קלוף',
'שומר',
'שזיף',
'שסק',
'שמיר',
'שעועית',
'תות שדה',
'תירס',
'תמר',
'תפוח אדמה',
'תפוח',
'תפוז'
);

CREATE TYPE region AS ENUM (
'צפון',
'מרכז',
'דרום'
);

CREATE TYPE familiarity AS ENUM (
'לא רלוונטי',
'לא מוכר',
'מוכר ונקטף', 
'מוכר ולא נקטף' 
);

CREATE TYPE type AS ENUM (
'מבנה',
'מנהרות',
'בית רשת',
'בתי צמיחה',
'כיסוי רשת',
'שטח פתוח'
);

CREATE TYPE status AS ENUM (
'לא רלוונטי',
'טופל',
'דורש טיפול',
'בטיפול מוקד',
'בטיפול מ.איזור',
'בטיפול רכז',
'לא בטיפול',
'בהשהייה'
);

CREATE TABLE "field" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "product" product,
  "farmer_id" varchar,
  "region" region,
  "familiarity" familiarity,
  "type" type,
  "coordinates" point,
  "plot" polygon,
  "status" status,
  "status_date" timestamp,
  "delay_date" timestamp
);

CREATE TABLE "history" (
  "id" int PRIMARY KEY,
  "date" timestamp,
  "field_id" int,
  "product" product,
  "farmer_id" varchar
);

CREATE TABLE "mission" (
  "id" int PRIMARY KEY,
  "date" timestamp,
  "field_id" int,
  "product" product,
  "amount_kg" float,
  "was_ripe" bool,
  "was_picked" bool,
  "not_picked_desc" varchar
);

CREATE TABLE "satellite" (
  "id" int PRIMARY KEY,
  "date" timestamp,
  "field_id" int,
  "statistics" json,
  "like" bool
);

CREATE TABLE "market" (
  "id" int PRIMARY KEY,
  "date" timestamp,
  "product" product,
  "price" float
);

CREATE TABLE "attractiveness" (
  "id" int PRIMARY KEY,
  "date" timestamp,
  "field_id" int,
  "product" product,
  "mission_score" float,
  "market_score" float,
  "satellite_score" float,
  "average_score" float,
  "like" bool
);

ALTER TABLE "history" ADD FOREIGN KEY ("field_id") REFERENCES "field" ("id");

ALTER TABLE "mission" ADD FOREIGN KEY ("field_id") REFERENCES "field" ("id");

ALTER TABLE "satellite" ADD FOREIGN KEY ("field_id") REFERENCES "field" ("id");

ALTER TABLE "attractiveness" ADD FOREIGN KEY ("field_id") REFERENCES "field" ("id");