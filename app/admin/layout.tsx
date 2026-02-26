"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, FolderOpen, Settings, LogOut, Menu, X, MessageSquare } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [checking, setChecking] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Skip auth check for login page
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (isLoginPage) {
            setChecking(false);
            return;
        }

        fetch("/api/auth/check")
            .then((res) => {
                if (!res.ok) {
                    router.push("/admin/login");
                } else {
                    setChecking(false);
                }
            })
            .catch(() => router.push("/admin/login"));
    }, [isLoginPage, router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    // Login page gets its own layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (checking) {
        return (
            <div className="min-h-screen bg-[#0f1923] flex items-center justify-center">
                <div className="text-[#D4C5A9]/40 font-mono text-sm">Yükleniyor...</div>
            </div>
        );
    }

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/urunler", label: "Ürünler", icon: Package },
        { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderOpen },
        { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
        { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#0f1923] flex">
            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-40 w-[240px] bg-[#0a1219] border-r border-[#D4C5A9]/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-[#D4C5A9]/10">
                    <h1 className="font-cormorant text-xl text-[#D4C5A9] tracking-[0.15em]">
                        Eşiler <span className="text-[#B5622C]">Triko</span>
                    </h1>
                    <p className="font-mono text-[0.55rem] tracking-[0.15em] text-[#D4C5A9]/30 uppercase mt-1">
                        Admin Panel
                    </p>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-[0.8rem] tracking-[0.05em] transition-colors rounded ${isActive
                                    ? "bg-[#B5622C]/20 text-[#D4C5A9]"
                                    : "text-[#D4C5A9]/50 hover:text-[#D4C5A9] hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-[#D4C5A9]/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-colors w-full rounded"
                    >
                        <LogOut size={18} />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="h-16 bg-[#0a1219]/80 backdrop-blur-md border-b border-[#D4C5A9]/10 flex items-center px-6 sticky top-0 z-20">
                    <button
                        className="md:hidden text-[#D4C5A9]/60 hover:text-[#D4C5A9] mr-4"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <span className="font-mono text-[0.7rem] tracking-[0.1em] text-[#D4C5A9]/50 uppercase">
                        {navItems.find((i) => i.href === pathname)?.label || "Admin"}
                    </span>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}
