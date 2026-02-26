"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import AboutSection from "@/components/AboutSection";
import ContactStrip from "@/components/ContactStrip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export type Product = {
  id: number;
  name: string;
  cat: string;
  catLabel: string;
  fabric: string;
  gram: string;
  size: string;
  colors: string[];
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setApiProducts(data);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = activeFilter === "all"
    ? apiProducts
    : apiProducts.filter(p => p.cat === activeFilter);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <main className="min-h-screen bg-cream selection:bg-terra/30 selection:text-dark">
      <Navbar />

      <Hero />

      <StatsBar />

      <Categories onCategoryClick={setActiveFilter} />

      {/* PRODUCTS SECTION */}
      <section id="urunler" className="py-24 px-6 md:px-24">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-terra flex items-center gap-4 mb-6
              before:content-[''] before:w-10 before:h-[1px] before:bg-terra before:inline-block">
              Ürün Kataloğu
            </div>
            <h2 className="font-cormorant text-4xl md:text-[4rem] font-light text-dark leading-[1.15]">
              Koleksiyondan<br />Seçmeler
            </h2>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-12">
          {['all', 'penye', 'buyuk', 'hirka', 'badi'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 border border-border text-[0.75rem] tracking-[0.1em] uppercase transition-all duration-300 ${activeFilter === cat
                ? 'bg-dark text-cream border-dark'
                : 'bg-transparent text-light-text hover:bg-dark hover:text-cream hover:border-dark'
                }`}
            >
              {cat === 'all' ? 'Tümü' : cat === 'buyuk' ? 'Penye Büyük Beden' : cat === 'hirka' ? 'Hırka & Yelek' : cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </motion.div>
      </section>

      <AboutSection />

      <ContactStrip />

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
