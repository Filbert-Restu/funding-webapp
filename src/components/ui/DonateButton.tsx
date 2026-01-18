import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import {
  CROWDFUND_ABI,
  CROWDFUND_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "@/constants/abi";
import { useEffect } from "react";

// 1. Definisikan tipe props agar TypeScript tidak protes
interface DonateButtonProps {
  campaignId: bigint;
}

export default function DonateButton({ campaignId }: DonateButtonProps) {
  // Ambil status pending (saat popup Metamask muncul)
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
  } = useWriteContract();

  // 2. Gunakan hook ini untuk menunggu transaksi selesai di Blockchain
  // (Ini menghilangkan error 'defined but never used')
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleApprove = () => {
    writeContract({
      address: TOKEN_ADDRESS,
      abi: TOKEN_ABI,
      functionName: "approve",
      args: [CROWDFUND_ADDRESS, parseEther("50000")],
    });
  };

  const handleDonate = () => {
    writeContract({
      address: CROWDFUND_ADDRESS,
      abi: CROWDFUND_ABI,
      functionName: "donateToCampaign",
      args: [campaignId, parseEther("100")],
    });
  };

  // Opsional: Alert jika sukses
  useEffect(() => {
    if (isConfirmed) {
      alert("Transaksi Berhasil Dikonfirmasi!");
    }
  }, [isConfirmed]);

  // Cek apakah sedang loading (metamask buka atau nunggu block)
  const isLoading = isWritePending || isConfirming;

  return (
    <div className="flex gap-2 mt-2">
      {/* Tombol Approve */}
      <button
        onClick={handleApprove}
        disabled={isLoading}
        className={`p-2 text-white rounded ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Proses..." : "Step 1: Approve"}
      </button>

      {/* Tombol Donasi */}
      <button
        onClick={handleDonate}
        disabled={isLoading}
        className={`p-2 text-white rounded ${
          isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isLoading ? "Proses..." : "Step 2: Donasi"}
      </button>

      {/* Tampilkan Hash Transaksi jika ada */}
      {hash && (
        <div className="text-xs text-gray-500 mt-1">
          Tx Hash: {hash.slice(0, 6)}...{hash.slice(-4)}
        </div>
      )}
    </div>
  );
}
