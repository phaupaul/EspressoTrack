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
  rating: real("rating"),
});

export const insertProfileSchema = createInsertSchema(profiles)
  .omit({ id: true })
  .extend({
    grinderSetting: z.number().min(1).max(16),
    grindAmount: z.number().min(1).max(100),
    rating: z.number().min(1).max(5).optional(),
  });

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;