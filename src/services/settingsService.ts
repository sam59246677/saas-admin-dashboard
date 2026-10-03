import type { Settings } from "../types/settings";

let settings: Settings = {
companyName: "Sam Company",
email: "admin@example.com",
notifications: true,
newsletter: false,
};

export async function getSettings(): Promise<Settings> {
await new Promise((resolve) =>setTimeout(resolve, 500));
return settings;
}

export async function updateSettings(newSettings: Settings): Promise<Settings> {
await new Promise((resolve) =>setTimeout(resolve, 500));
settings = newSettings;
return settings;
}