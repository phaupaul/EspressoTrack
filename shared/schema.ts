import { pgTable, text, serial, integer, real, timestamp, uniqueIndex, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const roastOptions = ["Light", "Medium", "Medium-Dark", "Dark"] as const;

// Advanced feedback options
export const appearanceOptions = ["Thick & golden-brown (ideal)", "Thin or pale (under-extracted)", "Dark or spotty (over-extracted)"] as const;
export const aromaOptions = ["Strong & inviting", "Mild & noticeable", "Weak or flat"] as const;
export const tasteOptions = ["Well-balanced (ideal)", "Too sour (under-extracted)", "Too bitter (over-extracted)", "Flat or lacking flavor"] as const;
export const bodyOptions = ["Rich & velvety (ideal)", "Smooth but light", "Watery or thin", "Heavy & syrupy"] as const;
export const aftertasteOptions = ["Pleasant & lingers nicely", "Fades too fast", "Harsh or unpleasant"] as const;
export const extractionTimeOptions = ["Ideal", "Too fast, under-extracted", "Too slow, over-extracted"] as const;

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
  blogs: many(blogs),
}));

// Update profiles table to include user relationship and advanced feedback
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  brand: text("brand").notNull(),
  product: text("product").notNull(),
  roast: text("roast", { enum: roastOptions }).notNull(),
  grinderSetting: integer("grinder_setting").notNull().default(8),
  grindAmount: integer("grind_amount").notNull().default(50),
  grindAmountGrams: real("grind_amount_grams").notNull().default(18),
  rating: real("rating"),
  // Advanced feedback fields
  advancedFeedback: boolean("advanced_feedback").default(false),
  appearance: text("appearance", { enum: appearanceOptions }),
  aroma: text("aroma", { enum: aromaOptions }),
  taste: text("taste", { enum: tasteOptions }),
  body: text("body", { enum: bodyOptions }),
  aftertaste: text("aftertaste", { enum: aftertasteOptions }),
  extractionTime: text("extraction_time", { enum: extractionTimeOptions }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Add relations for profiles
export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

// Add Blog table
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Add blog relations
export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
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
    grinderSetting: z.number().min(1).max(16),
    grindAmount: z.number().min(1).max(100),
    grindAmountGrams: z.number().min(0).max(25),
    rating: z.number().min(1).max(5).optional(),
    // Make advanced feedback fields optional
    advancedFeedback: z.boolean().optional(),
    appearance: z.enum(appearanceOptions).optional(),
    aroma: z.enum(aromaOptions).optional(),
    taste: z.enum(tasteOptions).optional(),
    body: z.enum(bodyOptions).optional(),
    aftertaste: z.enum(aftertasteOptions).optional(),
    extractionTime: z.enum(extractionTimeOptions).optional(),
  });

export const insertSettingsSchema = createInsertSchema(settings)
  .omit({ id: true });

// Add blog schema
export const insertBlogSchema = createInsertSchema(blogs)
  .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
  .extend({
    title: z.string().min(1, "Title is required").max(200, "Title is too long"),
    content: z.string().min(1, "Content is required"),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;

export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogs.$inferSelect;