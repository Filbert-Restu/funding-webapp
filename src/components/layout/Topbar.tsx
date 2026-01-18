"use client";

import Link from "next/link";
import React from "react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import { Address, Identity, Name } from "@coinbase/onchainkit/identity";

export default function Topbar() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Funding";

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white"
            >
              <div className="h-8 w-8 rounded-md bg-linear-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white">
                F
              </div>
              <span>{projectName}</span>
            </Link>

            <nav className="hidden sm:flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
              <Link href="/" className="hover:underline">
                Beranda
              </Link>
              <Link href="/campaigns" className="hover:underline">
                Campaigns
              </Link>
              <Link href="/create" className="hover:underline">
                Buat Campaign
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-slate-600 dark:text-slate-300">
              Jaringan: Sepolia
            </div>

            <Wallet>
              <ConnectWallet>
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
        </div>
      </div>
    </header>
  );
}
