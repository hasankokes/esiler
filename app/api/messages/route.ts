import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data: messages, error } = await supabase.from('messages').select('*').order('createdAt', { ascending: false });
        if (error) {
            throw error;
        }
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

        const newMessage = {
            name,
            company: company || '',
            email,
            message,
            createdAt: new Date().toISOString(),
            isRead: false
        };

        const { error } = await supabase.from('messages').insert([newMessage]);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            { success: true, message: 'Mesajınız başarıyla alındı' },
            { status: 201 }
        );
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

        const { error } = await supabase.from('messages').delete().eq('id', id);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true, message: 'Mesaj silindi' });
    } catch (error) {
        console.error('Message delete error:', error);
        return NextResponse.json(
            { success: false, error: 'Mesaj silinemedi' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const { data, error } = await supabase.from('messages').update(body).eq('id', body.id).select().single();
        if (error) throw error;

        return NextResponse.json({ success: true, message: data });
    } catch {
        return NextResponse.json({ success: false, error: "Mesaj güncellenemedi" }, { status: 500 });
    }
}
