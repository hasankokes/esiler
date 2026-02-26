import fs from "fs";
import path from "path";

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

export type Settings = {
    geminiApiKey?: string;
};

export function readSettings(): Settings {
    try {
        if (!fs.existsSync(SETTINGS_FILE)) {
            writeSettings({});
            return {};
        }
        const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

export function writeSettings(settings: Settings) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}
