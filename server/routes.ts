import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema, insertSettingsSchema } from "@shared/schema";
import { setupAuth } from "./auth";

function ensureAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Protected routes
  app.get("/api/profiles", ensureAuthenticated, async (req, res) => {
    const profiles = await storage.getProfiles();
    // Only return profiles belonging to the current user
    const userProfiles = profiles.filter(p => p.userId === req.user!.id);
    res.json(userProfiles);
  });

  app.get("/api/profiles/:id", ensureAuthenticated, async (req, res) => {
    const profile = await storage.getProfile(Number(req.params.id));
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    if (profile.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(profile);
  });

  app.post("/api/profiles", ensureAuthenticated, async (req, res) => {
    const result = insertProfileSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }
    const profile = await storage.createProfile(req.user!.id, result.data);
    res.status(201).json(profile);
  });

  app.patch("/api/profiles/:id", ensureAuthenticated, async (req, res) => {
    const profile = await storage.getProfile(Number(req.params.id));
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    if (profile.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = insertProfileSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }

    const updatedProfile = await storage.updateProfile(Number(req.params.id), result.data);
    res.json(updatedProfile);
  });

  app.delete("/api/profiles/:id", ensureAuthenticated, async (req, res) => {
    const profile = await storage.getProfile(Number(req.params.id));
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    if (profile.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await storage.deleteProfile(Number(req.params.id));
    res.status(204).send();
  });

  app.get("/api/settings", ensureAuthenticated, async (_req, res) => {
    const settings = await storage.getSettings();
    res.json(settings);
  });

  app.patch("/api/settings", ensureAuthenticated, async (req, res) => {
    const result = insertSettingsSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }
    const settings = await storage.updateSettings(result.data);
    res.json(settings);
  });

  return createServer(app);
}