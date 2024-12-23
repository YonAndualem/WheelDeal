import { json, pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const carListing = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagLine: varchar("tagLine"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  type: varchar("type").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType").notNull(),
  transmission: varchar("transmission").notNull(),
  fuelType: varchar("fuelType").notNull(),
  mileage: varchar("mileage").notNull(),
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  color: varchar("color").notNull(),
  door: varchar("door").notNull(),
  offerType: varchar("offerType"),
  vin: varchar("vin"),
  listingDescription: varchar("listingDescription").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName").notNull().$default("Yon"),
  userImageUrl: varchar("UserImageUrl").$default(
    "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png"
  ),
  postedOn: varchar("postedOn")
});

export const CarImages = pgTable("carImages", {
    id : serial('id').primaryKey(),
    imageUrl: varchar('imageUrl').notNull(),
    carListingId: integer('carListingId').references(()=>carListing.id).notNull()
});