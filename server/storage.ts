import { profiles, type Profile, type InsertProfile, settings, type Settings, type InsertSettings } from "@shared/schema";

export interface IStorage {
  getProfiles(): Promise<Profile[]>;
  getProfile(id: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  deleteProfile(id: number): Promise<void>;
  getSettings(): Promise<Settings>;
  updateSettings(settings: InsertSettings): Promise<Settings>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private currentId: number;
  private settings: Settings;

  constructor() {
    this.profiles = new Map();
    this.currentId = 1;
    this.settings = {
      id: 1,
      grinderSettingMin: 1,
      grinderSettingMax: 16,
      dialSettingMin: 1,
      dialSettingMax: 100,
      grindAmountMin: 0,
      grindAmountMax: 25,
    };
  }

  async getProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfile(id: number): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentId++;
    const profile: Profile = {
      ...insertProfile,
      id,
      grinderSetting: insertProfile.grinderSetting ?? 8,
      grindAmount: insertProfile.grindAmount ?? 50,
      grindAmountGrams: insertProfile.grindAmountGrams ?? 18,
      rating: insertProfile.rating ?? null
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined> {
    const existing = this.profiles.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...profile };
    this.profiles.set(id, updated);
    return updated;
  }

  async deleteProfile(id: number): Promise<void> {
    this.profiles.delete(id);
  }

  async getSettings(): Promise<Settings> {
    return this.settings;
  }

  async updateSettings(newSettings: InsertSettings): Promise<Settings> {
    this.settings = { ...this.settings, ...newSettings };
    return this.settings;
  }
}

export const storage = new MemStorage();