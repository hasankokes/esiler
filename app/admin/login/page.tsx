"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin");
            } else {
                setError(data.error || "Giriş başarısız");
            }
        } catch {
            setError("Bir hata oluştu. Tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1923] flex items-center justify-center px-4">
            <div className="w-full max-w-[400px]">
                {/* Logo / Title */}
                <div className="text-center mb-12">
                    <h1 className="font-cormorant text-4xl text-[#D4C5A9] font-light tracking-[0.15em]">
                        Eşiler <span className="text-[#B5622C]">Triko</span>
                    </h1>
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#D4C5A9]/40 uppercase mt-3">
                        ✦ Yönetim Paneli ✦
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[0.8rem] p-4 text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                            Kullanıcı Adı
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3.5 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#D4C5A9]/60 mb-2">
                            Şifre
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-[#D4C5A9]/20 px-4 py-3.5 text-[0.9rem] text-[#D4C5A9] placeholder-[#D4C5A9]/20 focus:outline-none focus:border-[#B5622C] transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#B5622C] text-white py-4 text-[0.75rem] tracking-[0.15em] uppercase font-medium hover:bg-[#9a5325] transition-colors disabled:opacity-50 mt-2"
                    >
                        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>

                <p className="text-center text-[#D4C5A9]/20 font-mono text-[0.6rem] tracking-[0.1em] mt-12">
                    © 2025 Eşiler Triko — Est. 1964
                </p>
            </div>
        </div>
    );
}
