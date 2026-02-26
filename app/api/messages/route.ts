import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/messages.json');

// Helper to read data
const readData = () => {
    try {
        if (!fs.existsSync(dataFilePath)) {
            return [];
        }
        const jsonData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Veri okuma hatası:', error);
        return [];
    }
};

// Helper to write data
const writeData = (data: unknown) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Veri yazma hatası:', error);
        return false;
    }
};

export async function GET() {
    try {
        const messages = readData();
        return NextResponse.json({ success: true, messages });
    } catch (error) {
        console.error('Messages fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Mesajlar getirilemedi' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Ad, e-posta ve mesaj alanları zorunludur' },
                { status: 400 }
            );
        }

        const messages = readData();
        const newMessage = {
            id: Date.now().toString(),
            name,
            company: company || '',
            email,
            message,
            createdAt: new Date().toISOString(),
            isRead: false
        };

        messages.push(newMessage);

        if (writeData(messages)) {
            return NextResponse.json(
                { success: true, message: 'Mesajınız başarıyla alındı' },
                { status: 201 }
            );
        } else {
            throw new Error('Dosyaya yazılamadı');
        }
    } catch (error) {
        console.error('Message create error:', error);
        return NextResponse.json(
            { success: false, error: 'Mesaj kaydedilemedi' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Mesaj ID si gerekli' },
                { status: 400 }
            );
        }

        let messages = readData();
        const initialLength = messages.length;
        messages = messages.filter((msg: { id: string }) => msg.id !== id);

        if (messages.length === initialLength) {
            return NextResponse.json(
                { success: false, error: 'Mesaj bulunamadı' },
                { status: 404 }
            );
        }

        if (writeData(messages)) {
            return NextResponse.json({ success: true, message: 'Mesaj silindi' });
        } else {
            throw new Error('Dosyaya yazılamadı');
        }
    } catch (error) {
        console.error('Message delete error:', error);
        return NextResponse.json(
            { success: false, error: 'Mesaj silinemedi' },
            { status: 500 }
        );
    }
}
