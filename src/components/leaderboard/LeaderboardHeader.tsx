import React from 'react';

const LeaderboardHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-16">
      <img 
        src="/lovable-uploads/21859210-7061-4caa-a2d4-7643d5be754a.png" 
        alt="Perplexity Logo" 
        className="h-16 w-auto mb-6"
      />
      <h1 className="text-5xl font-normal tracking-tight text-white mb-2">
        Leaderboard For Europe, Middle East and the UK
      </h1>
      <h2 className="text-3xl font-normal text-white/80">
        Race to 500
      </h2>
    </div>
  );
};

export default LeaderboardHeader;