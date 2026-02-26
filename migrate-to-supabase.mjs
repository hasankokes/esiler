import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Initialize Supabase client
const SUPABASE_URL = "https://jgqcyrkqqtinnxesiamy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncWN5cmtxcXRpbm54ZXNpYW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTM2MTcsImV4cCI6MjA4NzY4OTYxN30.3kqKbT45_m2XDEayblJf5XQ6qQGpGgvqFomwkxaw8n4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function run() {
    try {
        console.log("Migrating Categories...");
        const categories = JSON.parse(fs.readFileSync("./data/categories.json", "utf8"));
        for (let c of categories) {
            await supabase.from("categories").upsert({
                id: c.id,
                value: c.value,
                label: c.label,
                description: c.description
            });
        }

        console.log("Migrating Products...");
        const products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
        for (let p of products) {
            await supabase.from("products").upsert({
                id: p.id,
                name: p.name,
                cat: p.cat,
                catLabel: p.catLabel,
                fabric: p.fabric,
                gram: p.gram,
                size: p.size,
                colors: p.colors
            });
        }

        console.log("Migrating Messages...");
        const messages = JSON.parse(fs.readFileSync("./data/messages.json", "utf8"));
        for (let m of messages) {
            await supabase.from("messages").upsert({
                id: m.id,
                name: m.name,
                company: m.company,
                email: m.email,
                message: m.message,
                createdAt: m.createdAt,
                isRead: m.isRead || false
            });
        }

        console.log("Setting default settings...");
        const settingsRaw = fs.readFileSync("./data/settings.json", "utf8");
        await supabase.from("settings").upsert({
            id: 'site_settings',
            data: JSON.parse(settingsRaw)
        });

        console.log("Migration complete!");
    } catch (err) {
        console.error(err);
    }
}

run();
