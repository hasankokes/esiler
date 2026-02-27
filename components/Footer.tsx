import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-12 px-6 md:px-24 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="font-cormorant text-[1.2rem] tracking-[0.15em] text-dark">
                Eşiler Triko
            </div>
            <div className="flex items-center gap-8">
                <Link href="#kategoriler" className="text-[0.75rem] tracking-[0.08em] text-light-text hover:text-terra transition-colors no-underline">
                    Koleksiyon
                </Link>
                <Link href="#hakkimizda" className="text-[0.75rem] tracking-[0.08em] text-light-text hover:text-terra transition-colors no-underline">
                    Hakkımızda
                </Link>
                <Link href="#iletisim" className="text-[0.75rem] tracking-[0.08em] text-light-text hover:text-terra transition-colors no-underline">
                    İletişim
                </Link>
                <a href="https://www.instagram.com/esilertriko/" target="_blank" rel="noopener noreferrer" className="text-light-text hover:text-terra transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>
            </div>
            <div className="text-[0.75rem] text-light-text font-mono">
                © {new Date().getFullYear()} Eşiler Triko — Est. <span className="italic">1964</span>
            </div>
        </footer>
    );
}
