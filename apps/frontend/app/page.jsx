"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedProducts from "./components/FeaturedProducts";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
