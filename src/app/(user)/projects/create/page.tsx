// app/create/page.tsx
"use client";
import CreateCampaignForm from "@/components/ui/CreateCampaign";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Mulai Galang Dana</h1>
        <p className="text-gray-400 mb-8">
          Isi detail proyek Anda. Kami akan mereview sebelum tayang on-chain.
        </p>

        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
          <CreateCampaignForm />
        </div>
      </div>
    </div>
  );
}
