export type Product = {
    id: number;
    name: string;
    cat: string;
    catLabel: string;
    fabric: string;
    gram: string;
    size: string;
    colors: string[];
    images?: string[];
    status?: string;
    minOrder?: string;
};
