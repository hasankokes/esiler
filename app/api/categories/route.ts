import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { readCategories } = await import("@/lib/categories-store");
    return NextResponse.json(readCategories());
}

export async function POST(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { readCategories, writeCategories } = await import("@/lib/categories-store");
    const categories = readCategories();

    const newCat = {
        id: Date.now(),
        value: body.value || body.label.toLowerCase().replace(/[^a-z0-9]/g, ""),
        label: body.label,
        description: body.description || "",
        createdAt: new Date().toISOString(),
    };

    categories.push(newCat);
    writeCategories(categories);

    return NextResponse.json(newCat, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { readCategories, writeCategories } = await import("@/lib/categories-store");
    const categories = readCategories();

    const index = categories.findIndex((c: { id: number }) => c.id === body.id);
    if (index === -1) {
        return NextResponse.json({ error: "Kategori bulunamadı" }, { status: 404 });
    }

    categories[index] = { ...categories[index], ...body };
    writeCategories(categories);

    return NextResponse.json(categories[index]);
}

export async function DELETE(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    const { readCategories, writeCategories } = await import("@/lib/categories-store");
    const categories = readCategories();
    const filtered = categories.filter((c: { id: number }) => c.id !== id);

    if (filtered.length === categories.length) {
        return NextResponse.json({ error: "Kategori bulunamadı" }, { status: 404 });
    }

    writeCategories(filtered);
    return NextResponse.json({ success: true });
}
