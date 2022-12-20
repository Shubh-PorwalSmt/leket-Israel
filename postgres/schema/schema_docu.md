# Leket-Israel PostgreSQL Schema Description

*description: can be Hebrew / English
**possible values: comma separated objects which may be wholly inhabit a column value unless stated otherwise


| table_name | field | description* | possible values**
|--|--|--|--|
| crop | leket_id | קוד יבול - מערכת פריוריטי | "חצילים" |
| region | name | שם אזור | "שרון", "מרכז", "דרום" |
| agriculture_field_location | polygon | TEMPORARY POSSIBLE VALUE geographical polygon & location representation (2 hex digits) | 000000000140000000000000004010000000000000 |
| farmer_crop_field | leket_farmer_id | קוד חקלאי - מערכת פריוריטי | "F0003211" |
| crop_field_history | ndvi | מדד צימוח | float range (-1.0,+1.0) |

## Additional explanation
* Table `crop_container` holds a relationship between crop types and their valid containers
* Table `crop_field_history_feedback` refers a certain, yet to be determined, feedback to a certain entry in Table `crop_field_history` for data science operations (last edited 2022-12-20)
