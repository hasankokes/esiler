import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "categories.json");

export type Category = {
    id: number;
    value: string;
    label: string;
    description?: string;
    createdAt?: string;
};

const DEFAULT_CATEGORIES: Category[] = [
    { id: 1, value: "penye", label: "Penye", description: "Penye tişört ve üst giyim" },
    { id: 2, value: "buyuk", label: "Penye Büyük Beden", description: "Büyük beden penye ürünler" },
    { id: 3, value: "hirka", label: "Hırka & Yelek", description: "Triko hırka ve yelek modelleri" },
    { id: 4, value: "badi", label: "Badi", description: "Badi ve sweatshirt modelleri" },
];

export function readCategories(): Category[] {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            writeCategories(DEFAULT_CATEGORIES);
            return DEFAULT_CATEGORIES;
        }
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const cats = JSON.parse(raw);
        return cats.length > 0 ? cats : DEFAULT_CATEGORIES;
    } catch {
        return DEFAULT_CATEGORIES;
    }
}

export function writeCategories(categories: Category[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(categories, null, 2), "utf-8");
}
