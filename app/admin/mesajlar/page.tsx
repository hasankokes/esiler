"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Trash2, Mail, Building, Clock } from "lucide-react";

interface Message {
    id: string;
    name: string;
    company: string;
    email: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

export default function Messages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages");
            const data = await res.json();
            if (data.success) {
                // Sort by date descending
                const sorted = data.messages.sort((a: Message, b: Message) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setMessages(sorted);
            } else {
                setError(data.error);
            }
        } catch {
            setError("Mesajlar yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setMessages(messages.filter((msg) => msg.id !== id));
            } else {
                alert(data.error);
            }
        } catch {
            alert("Silme işlemi başarısız oldu.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-[#D4C5A9]/40 font-mono text-sm">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-cormorant text-[#D4C5A9] tracking-wider mb-2 flex items-center gap-3">
                        <MessageSquare className="text-[#B5622C]" />
                        Gelen Mesajlar
                    </h1>
                    <p className="text-[#D4C5A9]/50 font-mono text-xs uppercase tracking-widest">
                        İletişim formundan gelen sipariş ve iş birliği talepleri ({messages.length})
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {messages.length === 0 ? (
                    <div className="text-center py-16 bg-[#1a242f] border border-[#D4C5A9]/10 rounded-lg">
                        <MessageSquare size={48} className="mx-auto text-[#D4C5A9]/20 mb-4" />
                        <h3 className="text-[#D4C5A9] font-cormorant text-xl mb-2">Henüz Mesaj Yok</h3>
                        <p className="text-[#D4C5A9]/50 text-sm">
                            İletişim formundan yeni bir mesaj geldiğinde burada görünecektir.
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-[#1a242f] border border-[#D4C5A9]/10 rounded-lg p-6 relative group">
                            <button
                                onClick={() => handleDelete(msg.id)}
                                className="absolute top-6 right-6 text-red-400/50 hover:text-red-400 transition-colors"
                                title="Mesajı Sil"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1 md:max-w-[300px] space-y-3">
                                    <div className="font-cormorant text-2xl text-[#D4C5A9]">
                                        {msg.name}
                                    </div>

                                    {msg.company && (
                                        <div className="flex items-center gap-2 text-sm text-[#D4C5A9]/70">
                                            <Building size={14} className="text-[#B5622C]" />
                                            {msg.company}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-sm text-[#D4C5A9]/70">
                                        <Mail size={14} className="text-[#B5622C]" />
                                        <a href={`mailto:${msg.email}`} className="hover:text-[#D4C5A9] hover:underline">
                                            {msg.email}
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-mono text-[#D4C5A9]/40 mt-4">
                                        <Clock size={12} />
                                        {new Date(msg.createdAt).toLocaleString('tr-TR')}
                                    </div>
                                </div>

                                <div className="flex-1 border-t md:border-t-0 md:border-l border-[#D4C5A9]/10 pt-4 md:pt-0 md:pl-6">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4C5A9]/40 mb-3">
                                        Mesaj İçeriği
                                    </h4>
                                    <p className="text-[#D4C5A9]/90 text-sm leading-relaxed whitespace-pre-wrap">
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
