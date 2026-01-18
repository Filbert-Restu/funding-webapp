"use client";
import { Name, Identity, Address } from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import React, { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      // Ignore clicks inside the drawer
      if (drawerRef.current && drawerRef.current.contains(target)) return;
      // Ignore clicks on the toggle button so its click handler still runs
      if (toggleButtonRef.current && toggleButtonRef.current.contains(target))
        return;
      setIsMobileMenuOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // List Menu Navigasi
  const navLinks = [
    { name: "Beranda", href: "#" },
    { name: "Donasi", href: "#" },
    { name: "Tentang Kami", href: "#" },
    { name: "Laporan", href: "#" },
  ];

  return (
    // Container Utama: Sticky di atas + Efek Blur
    <nav className="sticky top-0 z-50 w-full border-b border-secondary bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* --- BAGIAN KIRI: LOGO --- */}
          <div className="flex items-center gap-2 cursor-pointer">
            {/* Contoh Logo Icon Sederhana */}
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Kita<span className="text-primary">Peduli</span>
            </span>
          </div>

          {/* --- BAGIAN TENGAH: MENU DESKTOP (Hidden di Mobile) --- */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex">
            <div>
              <Wallet>
                <ConnectWallet className="bg-primary text-primary-fg">
                  <Name />
                </ConnectWallet>

                <WalletDropdown>
                  {/* Identitas User */}
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Name />
                    <Address />
                  </Identity>

                  <WalletDropdownLink
                    icon="wallet"
                    href="https://keys.coinbase.com"
                  >
                    Wallet
                  </WalletDropdownLink>

                  {/* TOMBOL LOGOUT (DISCONNECT) */}
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                ref={toggleButtonRef}
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-muted hover:bg-secondary hover:text-foreground focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon Menu (Hamburger vs Close) */}
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-16 inset-x-0 bottom-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu} // Klik di luar menu untuk menutup
      ></div>

      {/* 2. Menu Container (Drawer) */}
      <div
        ref={drawerRef}
        className={`fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-[80%] max-w-xs bg-background shadow-2xl transition-transform duration-300 ease-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header Menu Mobile (Tombol Close) */}
          <div className="flex items-center justify-between p-5 border-b border-secondary">
            <span className="font-bold text-lg text-foreground">Menu</span>
          </div>

          {/* Links Navigasi */}
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-muted hover:bg-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
