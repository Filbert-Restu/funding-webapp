"use client";
import Link from "next/link";
import CampaignList from "@/components/ui/CampaignList";
import { ArrowRight, ShieldCheck, Zap, Coins } from "lucide-react"; // Install lucide-react jika belum

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* --- HERO SECTION --- */}
      {/* Kesan pertama: Megah, Trustworthy, dan Web3 Banget */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live on Base Mainnet
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Wujudkan Ide Onchain <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
              Tanpa Batas & Transparan.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform donasi terdesentralisasi pertama di Indonesia menggunakan
            IDRX. Tanpa potongan tersembunyi, langsung tercatat di blockchain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* CTA Utama: Untuk Donatur (Traffic Terbesar) */}
            <Link
              href="#explore"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              Mulai Donasi <ArrowRight size={20} />
            </Link>

            {/* CTA Sekunder: Untuk Creator */}
            <Link
              href="/projects/create"
              className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-bold rounded-full hover:bg-gray-700 transition-all"
            >
              Galang Dana
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Social Proof) --- */}
      <section className="border-y border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-400 mb-1">Rp 0</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Gas Fee Donatur
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-1">100%</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                On-Chain Verified
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-1">IDRX</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Stablecoin Lokal
              </p>
            </div>
          </div>
        </div>
      </section>

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
