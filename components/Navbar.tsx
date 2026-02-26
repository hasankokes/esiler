"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [announcementHeight, setAnnouncementHeight] = useState(32);
    const announcementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);

        const updateHeight = () => {
            if (announcementRef.current) {
                setAnnouncementHeight(announcementRef.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return (
        <>
            {/* Announcement Bar */}
            <div
                ref={announcementRef}
                className="bg-dark text-accent py-2 text-center font-mono text-[0.65rem] tracking-[0.15em] uppercase px-4"
            >
                ✦ 60 Yıldır Aynı Kalite, Aynı Güven ✦ Toptan Sipariş İçin: +90 212 520 68 25 ✦
            </div>

            {/* Navigation */}
            <nav
                className="fixed left-0 right-0 z-50 transition-transform duration-300 flex items-center justify-between bg-[#F5F0E8]/70 backdrop-blur-md py-4 px-6 md:px-12 border-b border-border"
                style={{
                    top: `${announcementHeight}px`,
                    transform: scrolled ? `translateY(-${announcementHeight}px)` : 'translateY(0)'
                }}
            >
                <Link
                    href="/"
                    className="font-cormorant text-xl md:text-2xl font-semibold tracking-[0.15em] text-dark uppercase"
                >
                    Eşiler <span className="text-terra">Triko</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-10 list-none">
                    <li>
                        <Link
                            href="#kategoriler"
                            className="text-xs tracking-[0.12em] uppercase text-dark relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:right-0 after:h-[1px] after:bg-terra after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-terra transition-colors"
                        >
                            Koleksiyon
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#hakkimizda"
                            className="text-xs tracking-[0.12em] uppercase text-dark relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:right-0 after:h-[1px] after:bg-terra after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-terra transition-colors"
                        >
                            Hakkımızda
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#urunler"
                            className="text-xs tracking-[0.12em] uppercase text-dark relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:right-0 after:h-[1px] after:bg-terra after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-terra transition-colors"
                        >
                            Ürünler
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#iletisim"
                            className="text-xs tracking-[0.12em] uppercase text-dark relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:right-0 after:h-[1px] after:bg-terra after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 hover:text-terra transition-colors"
                        >
                            İletişim
                        </Link>
                    </li>
                    <li className="flex items-center ml-2 border-l border-border pl-6">
                        <a href="https://www.instagram.com/esilertriko/" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-terra transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-dark p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-xl flex items-center justify-center bg-cream">
                    <ul className="flex flex-col gap-8 text-center">
                        <li>
                            <Link
                                href="#kategoriler"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-cormorant text-3xl text-dark"
                            >
                                Koleksiyon
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#hakkimizda"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-cormorant text-3xl text-dark"
                            >
                                Hakkımızda
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#urunler"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-cormorant text-3xl text-dark"
                            >
                                Ürünler
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#iletisim"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-cormorant text-3xl text-dark"
                            >
                                İletişim
                            </Link>
                        </li>
                        <li className="flex justify-center mt-4">
                            <a href="https://www.instagram.com/esilertriko/" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-terra transition-colors p-2" onClick={() => setMobileMenuOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
