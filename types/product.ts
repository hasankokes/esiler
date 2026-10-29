export type ProductImage = string | { url: string; color?: string };

export type Product = {
    id: number;
    name: string;
    cat: string;
    catLabel: string;
    fabric?: string;
    gram: string;
    size: string;
    colors: string[];
    images?: ProductImage[];
    status?: string;
    minOrder?: string;
    description?: string;
    sort_order?: number;
    is_gun_cicegi?: boolean;
    is_kis?: boolean;
    trendyolUrl?: string;
};
