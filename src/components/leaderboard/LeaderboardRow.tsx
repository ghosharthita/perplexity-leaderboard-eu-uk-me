interface LeaderboardEntry {
  id: number;
  [key: string]: any;
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  index: number;
}

const LeaderboardRow = ({ entry, index }: LeaderboardRowProps) => {
  return (
    <div 
      className="grid grid-cols-5 py-4 px-6 border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
    >
      <div className="font-mono text-xl font-normal text-gray-300 text-center">
        {index + 1}
      </div>
      <div className="text-lg text-gray-300 text-center">
        {entry["Country"]}
      </div>
      <div className="italic text-lg text-gray-300 text-left">
        {entry["School Name"]}
      </div>
      <div className="text-lg text-gray-300 text-center">
        {entry["Email Domain"]}
      </div>
      <div className="font-mono text-xl text-teal-light font-normal text-right">
        {entry["Activations (BTS 2025 Spring)"]}
      </div>
    </div>
  );
};

export default LeaderboardRow;