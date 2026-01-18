"use client";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="pointer-events-none mt-8 w-[780px] h-[480px] rounded-full bg-gradient-to-r from-blue-400/20 via-emerald-300/10 to-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text column */}
          <div className="md:col-span-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/25 border border-blue-800 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live on Base Mainnet
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Wujudkan Bantuanmu
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                Tanpa Batas & Transparan.
              </span>
            </h1>

            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-8">
              Platform donasi terdesentralisasi pertama di Indonesia menggunakan
              IDRX — langsung tercatat on-chain tanpa potongan tersembunyi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <Link
                href="#explore"
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-fg font-semibold rounded-full shadow-lg transform hover:scale-[1.02] transition-all"
              >
                Mulai Donasi
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/projects/create"
                className="inline-flex items-center gap-3 px-6 py-3 bg-background border border-secondary text-foreground font-semibold rounded-full hover:bg-secondary hover:text-primary transition-all"
              >
                Galang Dana
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 md:gap-6 justify-center md:justify-start">
              <div className="px-3 py-2 rounded-full bg-background border border-secondary text-muted text-sm">
                Rp 0 Gas Fee
              </div>
              <div className="px-3 py-2 rounded-full bg-background border border-secondary text-muted text-sm">
                100% On-Chain
              </div>
              <div className="px-3 py-2 rounded-full bg-background border border-secondary text-muted text-sm">
                Native IDRX
              </div>
            </div>
          </div>

          {/* Illustration column */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="w-[320px] h-[320px] rounded-2xl bg-gradient-to-tr from-blue-50/30 to-emerald-50/10 border border-secondary shadow-2xl flex items-center justify-center">
              {/* Simple illustrative SVG */}
              <svg viewBox="0 0 200 200" className="w-64 h-64">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <g fill="url(#g1)">
                  <rect
                    x="10"
                    y="40"
                    rx="12"
                    ry="12"
                    width="180"
                    height="120"
                    opacity="0.12"
                  />
                  <circle cx="60" cy="90" r="28" opacity="0.95" />
                  <circle cx="140" cy="110" r="20" opacity="0.9" />
                </g>
                <g fill="white">
                  <path d="M60 80h60v8H60z" opacity="0.9" />
                  <path d="M60 98h40v6H60z" opacity="0.8" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
