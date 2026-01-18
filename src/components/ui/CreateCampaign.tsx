"use client";

import { useState, useEffect } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseEther } from "viem";
import { CROWDFUND_ABI, CROWDFUND_ADDRESS } from "@/constants/abi";

export default function CreateCampaignForm() {
  // 1. AMBIL ADDRESS USER YANG LOGIN
  // Inilah cara aplikasi tahu siapa yang sedang membuat kampanye
  const { address, isConnected } = useAccount();

  // 2. STATE UNTUK MENAMPUNG INPUT USER
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  // 3. HOOKS WAGMI UNTUK TRANSAKSI
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Reset form jika sukses
  useEffect(() => {
    if (isSuccess) {
      alert("Kampanye Berhasil Dibuat! 🎉");
      setTitle("");
      setDesc("");
      setTarget("");
      setDeadline("");
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi: Pastikan wallet terkoneksi
    if (!isConnected || !address) {
      alert("Mohon koneksikan wallet terlebih dahulu di pojok kanan atas!");
      return;
    }

    if (!title || !desc || !target || !deadline) {
      alert("Semua kolom harus diisi!");
      return;
    }

    try {
      // KONVERSI DATA:
      // a. Target: String "100" -> BigInt Wei (100000...)
      const targetInWei = parseEther(target);

      // b. Deadline: String Tanggal -> Unix Timestamp (Detik)
      const deadlineTimestamp = BigInt(
        Math.floor(new Date(deadline).getTime() / 1000)
      );

      // EKSEKUSI TRANSAKSI
      writeContract({
        address: CROWDFUND_ADDRESS,
        abi: CROWDFUND_ABI,
        functionName: "createCampaign",
        args: [
          address, // <--- Address user otomatis masuk sini
          title, // Judul dari input
          desc, // Deskripsi dari input
          targetInWei, // Target (Wei)
          deadlineTimestamp, // Deadline (Timestamp)
        ],
      });
    } catch (err) {
      console.error("Gagal menyiapkan data:", err);
      alert("Input tidak valid (pastikan target berupa angka)");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
      {/* Input Judul */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Judul Kampanye
        </label>
        <input
          type="text"
          placeholder="Contoh: Bantu Renovasi Sekolah"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
        />
      </div>

      {/* Input Deskripsi */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Deskripsi
        </label>
        <textarea
          placeholder="Ceritakan tujuan kampanye..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 h-24"
        />
      </div>

      <div className="flex gap-4">
        {/* Input Target */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Target (Token)
          </label>
          <input
            type="number"
            placeholder="1000"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          />
        </div>

        {/* Input Deadline */}
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Batas Waktu
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={isPending || isConfirming || !isConnected}
        className={`mt-2 w-full py-3 rounded-lg font-bold transition-all shadow-lg ${
          isPending || isConfirming
            ? "bg-gray-600 cursor-not-allowed text-gray-300"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transform hover:-translate-y-1"
        }`}
      >
        {isPending
          ? "Cek Wallet Anda..."
          : isConfirming
          ? "Sedang Memproses..."
          : "🚀 Buat Kampanye"}
      </button>

      {/* Pesan Error */}
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 text-sm rounded-lg mt-2">
          Error: {error.message.split("\n")[0]}
        </div>
      )}

      {/* Link ke Explorer jika Sukses */}
      {isSuccess && hash && (
        <div className="text-center mt-2">
          <a
            href={`https://sepolia.basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 text-sm hover:underline"
          >
            Lihat Transaksi di Base Explorer ↗
          </a>
        </div>
      )}
    </form>
  );
}
