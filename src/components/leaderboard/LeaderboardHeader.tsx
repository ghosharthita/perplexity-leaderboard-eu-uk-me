import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface LeaderboardHeaderProps {
  onSort: () => void;
}

const LeaderboardTableHeader = ({ onSort }: LeaderboardHeaderProps) => {
  return (
    <div className="bg-[#2A2A2E] border-b border-gray-800">
      <div className="grid grid-cols-5 py-4 px-6">
        <div className="text-lg font-normal text-gray-400 text-center">#</div>
        <div className="text-lg font-normal text-gray-400 text-center">Country</div>
        <div className="text-lg font-normal text-gray-400 text-left">School Name</div>
        <div className="text-lg font-normal text-gray-400 text-center">Email Domain</div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={onSort}
            className="h-8 flex items-center gap-1 font-normal text-gray-400 hover:text-white hover:bg-transparent text-lg"
          >
            Activations (BTS 2025 Spring)
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTableHeader;