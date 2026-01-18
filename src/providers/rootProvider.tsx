"use client";

import "@coinbase/onchainkit/styles.css";
import { ReactNode, useState } from "react";
import { baseSepolia } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // <--- TAMBAHAN 1
import { http, createConfig, WagmiProvider } from "wagmi"; // <--- TAMBAHAN 2
import { coinbaseWallet } from "wagmi/connectors";

const ALCHEMY_RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || "";

// 1. Definisikan Chain Custom (Supaya RPC ke Alchemy, bukan Publik)
const customBaseSepolia = {
  ...baseSepolia,
  rpcUrls: {
    ...baseSepolia.rpcUrls,
    default: { http: [ALCHEMY_RPC_URL] },
  },
};

// 2. Buat Config Wagmi (Mesinnya)
const wagmiConfig = createConfig({
  chains: [customBaseSepolia], // Pakai chain custom kita
  transports: {
    [customBaseSepolia.id]: http(ALCHEMY_RPC_URL), // Pakai URL Alchemy
  },
  connectors: [
    coinbaseWallet({
      appName: "Hackathon Base App",
      preference: "smartWalletOnly",
    }),
  ],
  ssr: true,
});

export function RootProvider({ children }: { children: ReactNode }) {
  // 3. Setup React Query (Wajib untuk Wagmi v2)
  const [queryClient] = useState(() => new QueryClient());

  return (
    // LAYER 1: Wagmi Provider (Agar useWriteContract jalan)
    <WagmiProvider config={wagmiConfig}>
      {/* LAYER 2: Query Provider (Agar data caching jalan) */}
      <QueryClientProvider client={queryClient}>
        {/* LAYER 3: OnchainKit (Agar UI Coinbase jalan) */}
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={customBaseSepolia}
          config={{
            appearance: {
              mode: "auto",
            },
            wallet: {
              display: "modal",
              preference: "all",
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
