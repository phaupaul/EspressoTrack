import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const roastOptions = ["Light", "Medium", "Medium-Dark", "Dark"] as const;

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  product: text("product").notNull(),
  roast: text("roast", { enum: roastOptions }).notNull(),
  grinderSetting: integer("grinder_setting").notNull().default(8),
  grindAmount: integer("grind_amount").notNull().default(50),
  grindAmountGrams: integer("grind_amount_grams").notNull().default(18),
  rating: real("rating"),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  grinderSettingMin: integer("grinder_setting_min").notNull().default(1),
  grinderSettingMax: integer("grinder_setting_max").notNull().default(16),
  dialSettingMin: integer("dial_setting_min").notNull().default(1),
  dialSettingMax: integer("dial_setting_max").notNull().default(100),
  grindAmountMin: integer("grind_amount_min").notNull().default(0),
  grindAmountMax: integer("grind_amount_max").notNull().default(25),
});

export const insertProfileSchema = createInsertSchema(profiles)
  .omit({ id: true })
  .extend({
    grinderSetting: z.number().min(1).max(16),
    grindAmount: z.number().min(1).max(100),
    grindAmountGrams: z.number().min(0).max(25),
    rating: z.number().min(1).max(5).optional(),
  });

export const insertSettingsSchema = createInsertSchema(settings)
  .omit({ id: true });

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;