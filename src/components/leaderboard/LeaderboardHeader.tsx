
import React from 'react';

const LeaderboardHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8 md:mb-16 px-4">
      <img 
        src="/lovable-uploads/21859210-7061-4caa-a2d4-7643d5be754a.png" 
        alt="Perplexity Logo" 
        className="h-12 md:h-16 w-auto mb-4 md:mb-6"
      />
      <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-2 text-center">
        Leaderboard For Europe, Middle East and the UK
      </h1>
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-2xl md:text-3xl font-normal text-white/80">
          Race to 500
        </h2>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl">
          Universities across Europe, UK and the Middle East with 500+ sign-ups
          win free Pro for a year
        </p>
        <p className="text-base md:text-lg text-white/60 mt-4">
          How to sign-up: Create an account at{" "}
          <a 
            href="http://pplx.ai/students" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-teal-light hover:text-teal-light/80 underline transition-colors"
          >
            pplx.ai/students
          </a>
          {" "}with your university email (and get 1 month free Pro)
        </p>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
