import { pgTable, text, serial, integer, real, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const roastOptions = ["Light", "Light-Medium", "Medium", "Medium-Dark", "Dark"] as const;

// User table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    usernameIdx: uniqueIndex("username_idx").on(table.username),
  };
});

// Add relations for users
export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
}));

// Update profiles table to include user relationship
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  brand: text("brand").notNull(),
  product: text("product").notNull(),
  roast: text("roast", { enum: roastOptions }).notNull(),
  grinderSetting: integer("grinder_setting"),
  grindAmount: integer("grind_amount"),
  grindAmountGrams: integer("grind_amount_grams"),
  rating: real("rating"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Add relations for profiles
export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  grinderSettingMin: integer("grinder_setting_min").notNull().default(1),
  grinderSettingMax: integer("grinder_setting_max").notNull().default(16),
  dialSettingMin: integer("dial_setting_min").notNull().default(1),
  dialSettingMax: integer("dial_setting_max").notNull().default(100),
  grindAmountMin: integer("grind_amount_min").notNull().default(0),
  grindAmountMax: integer("grind_amount_max").notNull().default(25),
});

// Schema for user registration/login
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true })
  .extend({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  });

export const insertProfileSchema = createInsertSchema(profiles)
  .omit({ id: true, userId: true, createdAt: true })
  .extend({
    grinderSetting: z.number().min(1).max(16).nullable(),
    grindAmount: z.number().min(1).max(100).nullable(),
    grindAmountGrams: z.number().min(0).max(25).nullable(),
    rating: z.number().min(1).max(5).optional(),
  });

export const insertSettingsSchema = createInsertSchema(settings)
  .omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;