import React from 'react';
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
      <CardContent className="p-0 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#2A2A2E] border-b border-gray-800 sticky top-0">
            <div className="grid grid-cols-5 py-3 md:py-4 px-3 md:px-6">
              <div className="text-base md:text-lg font-normal text-gray-400 text-center">#</div>
              <div className="text-base md:text-lg font-normal text-gray-400 text-center">Country</div>
              <div className="text-base md:text-lg font-normal text-gray-400 text-left">School Name</div>
              <div className="text-base md:text-lg font-normal text-gray-400 text-center">Email Domain</div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={onSort}
                  className="h-8 flex items-center gap-1 font-normal text-gray-400 hover:text-white hover:bg-transparent text-base md:text-lg"
                >
                  Activations
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-[calc(70vh-80px)] overflow-auto">
            {entries.map((entry, index) => (
              <div 
                key={entry.id}
                className="grid grid-cols-5 py-3 md:py-4 px-3 md:px-6 border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
              >
                <div className="font-mono text-lg md:text-xl font-normal text-gray-300 text-center">
                  {index + 1}
                </div>
                <div className="text-base md:text-lg text-gray-300 text-center">
                  {entry["Country"]}
                </div>
                <div className="italic text-base md:text-lg text-gray-300 text-left">
                  {entry["School Name"]}
                </div>
                <div className="text-base md:text-lg text-gray-300 text-center">
                  {entry["Email Domain"]}
                </div>
                <div className="font-mono text-lg md:text-xl text-teal-light font-normal text-right">
                  {entry["Activations (BTS 2025 Spring)"]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardContent;