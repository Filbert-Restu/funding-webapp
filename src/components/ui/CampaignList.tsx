import { useReadContract } from "wagmi";
import { CROWDFUND_ABI, CROWDFUND_ADDRESS } from "@/constants/abi";
import DonateButton from "./DonateButton"; // <--- Import DonateButton di sini

interface Campaign {
  owner: string;
  title: string;
  description: string;
  targetAmount: bigint;
  deadline: bigint;
  amountCollected: bigint;
  claimed: boolean;
  donators: string[];
  donations: bigint[];
}

export default function CampaignList() {
  const { data, isLoading } = useReadContract({
    address: CROWDFUND_ADDRESS,
    abi: CROWDFUND_ABI,
    functionName: "getCampaigns",
  });

  const campaigns = (data as Campaign[]) || [];

  if (isLoading) return <div className="text-white">Loading campaigns...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      {campaigns.length > 0 ? (
        campaigns.map((campaign, index) => (
          <div
            key={index}
            className="border border-gray-700 bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="font-bold text-2xl mb-2 text-blue-400">
              {campaign.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 h-16 overflow-hidden">
              {campaign.description}
            </p>

            <div className="bg-gray-700 p-3 rounded-lg mb-4 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Terkumpul</span>
                <span className="font-mono text-green-400">
                  {campaign.amountCollected.toString()} Token
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Target</span>
                <span className="font-mono text-white">
                  {campaign.targetAmount.toString()} Token
                </span>
              </div>
            </div>

            {/* Masukkan DonateButton di sini, pass index sebagai ID */}
            <DonateButton campaignId={BigInt(index)} />
          </div>
        ))
      ) : (
        <p className="text-gray-400 col-span-3 text-center">
          Belum ada kampanye yang dibuat.
        </p>
      )}
    </div>
  );
}
