"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export default function ContactStrip() {
    const [modalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful } } = useForm();

    const onSubmit = async (data: Record<string, string>) => {
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!result.success) {
                console.error('Mesaj gönderilemedi:', result.error);
                // We're letting React Hook Form's isSubmitSuccessful handle the UX flow
            }
        } catch (error) {
            console.error('Sunucu hatası:', error);
        }
    };

    return (
        <>
            <section id="iletisim" className="bg-dark text-cream py-20 px-6 md:px-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent flex items-center gap-4 mb-6
            before:content-[''] before:w-10 before:h-[1px] before:bg-accent before:inline-block">
                        İletişim
                    </div>
                    <h2 className="font-cormorant text-4xl md:text-[2.5rem] font-light text-cream mb-8">
                        Bize Ulaşın
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-[0.9rem] text-cream/70">
                            <span>📍</span>
                            <span>Sururi mah. Sultan Mektep sok. Kaplan Han 14/14 Yeşildirek / Istanbul, Turkey 34120</span>
                        </div>
                        <div className="flex items-center gap-4 text-[0.9rem] text-cream/70">
                            <span>📞</span>
                            <span className="text-cream">+90 212 520 68 25</span>
                        </div>
                        {/* <div className="flex items-center gap-4 text-[0.9rem] text-cream/70">
                            <span>✉</span>
                            <span className="text-cream">info@esilertriko.com.tr</span>
                        </div> */}
                        <div className="flex items-center gap-4 text-[0.9rem] text-cream/70 hover:text-cream transition-colors">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></span>
                            <a href="https://www.instagram.com/esilertriko/" target="_blank" rel="noopener noreferrer" className="text-cream font-mono tracking-wider">
                                @esilertriko
                            </a>
                        </div>
                        <div className="flex items-center gap-4 text-[0.9rem] text-cream/70">
                            <span>⏰</span>
                            <span>Pzt–Cmt: 08:00 – 18:00</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col gap-4 items-start w-full md:w-auto"
                >
                    <a
                        href="tel:+902125206825"
                        className="w-full md:w-[220px] text-center px-8 py-4 border-[1.5px] border-cream text-cream text-[0.75rem] tracking-[0.15em] uppercase font-medium relative overflow-hidden group hover:text-dark transition-colors duration-400"
                    >
                        <span className="relative z-10 transition-colors duration-400 group-hover:text-dark">
                            Hemen Ara
                        </span>
                        <div className="absolute inset-0 bg-cream -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 z-0" />
                    </a>

                    <a
                        href="https://wa.me/902125206825"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-[220px] text-center px-8 py-4 border-[1.5px] border-[#25D366] text-[#25D366] text-[0.75rem] tracking-[0.15em] uppercase font-medium relative overflow-hidden group hover:text-white transition-colors duration-400"
                    >
                        <span className="relative z-10 transition-colors duration-400 group-hover:text-white">
                            WhatsApp İle Ulaş
                        </span>
                        <div className="absolute inset-0 bg-[#25D366] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 z-0" />
                    </a>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full md:w-[220px] text-center px-8 py-4 border-[1.5px] border-cream text-cream text-[0.75rem] tracking-[0.15em] uppercase font-medium relative overflow-hidden group hover:text-dark transition-colors duration-400"
                    >
                        <span className="relative z-10 transition-colors duration-400 group-hover:text-dark">
                            Mesaj Gönder
                        </span>
                        <div className="absolute inset-0 bg-cream -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 z-0" />
                    </button>
                </motion.div>
            </section>

            {/* Contact Form Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-cream w-full max-w-[500px] p-8 md:p-10 relative z-10"
                    >
                        <button
                            className="absolute top-4 right-4 text-dark hover:text-terra transition-colors"
                            onClick={() => setModalOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        <h3 className="font-cormorant text-3xl text-dark mb-6">İletişim Formu</h3>

                        {isSubmitSuccessful ? (
                            <div className="bg-green-50 text-green-800 p-6 text-center border border-green-200">
                                <span className="text-4xl block mb-4">✓</span>
                                Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-light-text mb-2">Ad Soyad</label>
                                    <input
                                        {...register("name", { required: true })}
                                        className="w-full bg-transparent border border-border px-4 py-3 text-[0.9rem] focus:outline-none focus:border-dark transition-colors"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div>
                                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-light-text mb-2">Firma Adı</label>
                                    <input
                                        {...register("company")}
                                        className="w-full bg-transparent border border-border px-4 py-3 text-[0.9rem] focus:outline-none focus:border-dark transition-colors"
                                        placeholder="Varsa Firma Adı"
                                    />
                                </div>
                                <div>
                                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-light-text mb-2">E-posta</label>
                                    <input
                                        {...register("email", { required: true })}
                                        type="email"
                                        className="w-full bg-transparent border border-border px-4 py-3 text-[0.9rem] focus:outline-none focus:border-dark transition-colors"
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-light-text mb-2">Mesaj</label>
                                    <textarea
                                        {...register("message", { required: true })}
                                        className="w-full bg-transparent border border-border px-4 py-3 text-[0.9rem] focus:outline-none focus:border-dark transition-colors min-h-[100px] resize-y"
                                        placeholder="Sipariş detayları veya sorunuz..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-dark text-cream py-4 text-[0.75rem] tracking-[0.15em] uppercase mt-4 hover:bg-black transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </>
    );
}
