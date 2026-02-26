import { NextRequest, NextResponse } from "next/server";

// GET: List all products
export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Products are stored in a JSON file for simplicity
    const { readProducts } = await import("@/lib/products-store");
    const products = readProducts();
    return NextResponse.json(products);
}

// POST: Create a new product
export async function POST(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { readProducts, writeProducts } = await import("@/lib/products-store");
    const products = readProducts();

    const newProduct = {
        id: Date.now(),
        ...body,
        createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
}

// PUT: Update a product
export async function PUT(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { readProducts, writeProducts } = await import("@/lib/products-store");
    const products = readProducts();

    const index = products.findIndex((p: { id: number }) => p.id === body.id);
    if (index === -1) {
        return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    products[index] = { ...products[index], ...body };
    writeProducts(products);

    return NextResponse.json(products[index]);
}

// DELETE: Delete a product
export async function DELETE(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    const { readProducts, writeProducts } = await import("@/lib/products-store");
    const products = readProducts();

    const filtered = products.filter((p: { id: number }) => p.id !== id);

    if (filtered.length === products.length) {
        return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    writeProducts(filtered);
    return NextResponse.json({ success: true });
}
