import fs from "fs";
import path from "path";
import { products as initialProducts } from "@/data/products";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

export function readProducts() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            // Initialize with mock data
            fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2), "utf-8");
            return initialProducts;
        }
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function writeProducts(products: unknown[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}
