import { Card, CardContent } from "@/components/ui/card";
import LeaderboardTableHeader from "./LeaderboardHeader";
import LeaderboardRow from "./LeaderboardRow";

interface LeaderboardEntry {
  id: number;
  [key: string]: any;
}

interface LeaderboardContentProps {
  entries: LeaderboardEntry[];
  onSort: () => void;
}

const LeaderboardContent = ({ entries, onSort }: LeaderboardContentProps) => {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl text-gray-400">No data available</p>
        <p className="text-xl text-gray-500">Last updated: {new Date().toLocaleString()}</p>
      </div>
    );
  }

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-0">
        <LeaderboardTableHeader onSort={onSort} />
        <div className="max-h-[calc(70vh-80px)] overflow-auto">
          {entries.map((entry, index) => (
            <LeaderboardRow 
              key={entry.id}
              entry={entry}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardContent;