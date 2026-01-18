"use client";
import Link from "next/link";
import CampaignList from "@/components/ui/CampaignList";
import Hero from "@/components/Hero";
import { ShieldCheck, Zap, Coins } from "lucide-react"; // Install lucide-react jika belum

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Hero />

      {/* --- FEATURES SECTION (Why Us?) --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="text-yellow-400" />}
            title="Gasless Donation"
            desc="Donatur tidak perlu punya ETH. Kami menanggung biaya gas fee untuk pengalaman donasi yang mulus."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-emerald-400" />}
            title="Terverifikasi Admin"
            desc="Setiap kampanye dikurasi secara ketat untuk mencegah penipuan. Keamanan donatur adalah prioritas."
          />
          <FeatureCard
            icon={<Coins className="text-blue-400" />}
            title="Native IDRX"
            desc="Donasi menggunakan Rupiah digital (IDRX). Nilai stabil, tidak terkena volatilitas pasar kripto."
          />
        </div>
      </section>

      {/* --- CAMPAIGN LIST SECTION --- */}
      <section id="explore" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">🔥 Kampanye Trending</h2>
              <p className="text-gray-400">
                Dukung proyek yang sedang hangat diperbincangkan.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-blue-400 hover:text-blue-300 font-medium hidden md:block"
            >
              Lihat Semua Proyek →
            </Link>
          </div>

          {/* List Component */}
          <CampaignList />

          <div className="mt-10 text-center md:hidden">
            <Link href="/projects" className="text-blue-400 font-medium">
              Lihat Semua Proyek →
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-800 py-12 text-center text-gray-600">
        <p className="mb-4">Built with ❤️ on Base Network</p>
        <p className="text-sm">Hackathon Project 2026 • 100% Open Source</p>
      </footer>
    </div>
  );
}

// Komponen Kecil untuk Feature Card
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
