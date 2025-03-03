
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
  sortOrder: 'asc' | 'desc';
}

const LeaderboardContent = ({ entries, onSort, sortOrder }: LeaderboardContentProps) => {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl text-gray-400">No data available</p>
        <p className="text-xl text-gray-500">Last updated: {new Date().toLocaleString()}</p>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-[#1F1F23] to-[#2A2A2E] border-none shadow-xl">
      <CardContent className="p-0 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-gradient-to-r from-[#2A2A2E] to-[#33333A] border-b border-gray-800/50 sticky top-0 backdrop-blur-sm">
            <div className="grid grid-cols-5 py-3 md:py-4 px-3 md:px-6">
              <div className="text-base md:text-lg font-normal text-indigo-200/90 text-center">#</div>
              <div className="text-base md:text-lg font-normal text-indigo-200/90 text-center">Country</div>
              <div className="text-base md:text-lg font-normal text-indigo-200/90 text-left">School Name</div>
              <div className="text-base md:text-lg font-normal text-indigo-200/90 text-center">Email Domain</div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={onSort}
                  className="h-8 flex items-center gap-1 font-normal text-indigo-200/90 hover:text-white hover:bg-indigo-500/10 text-base md:text-lg transition-colors"
                >
                  Activations
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="ml-1 text-xs">
                    {sortOrder === 'desc' ? '(High to Low)' : '(Low to High)'}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-[calc(70vh-80px)] overflow-auto">
            {entries.map((entry, index) => (
              <div 
                key={entry.id}
                className="grid grid-cols-5 py-3 md:py-4 px-3 md:px-6 border-b border-gray-800/30 hover:bg-indigo-500/5 transition-colors"
              >
                <div className="font-mono text-lg md:text-xl font-normal text-indigo-200 text-center">
                  {index + 1}
                </div>
                <div className="text-base md:text-lg text-indigo-100/90 text-center">
                  {entry["Country"]}
                </div>
                <div className="italic text-base md:text-lg text-indigo-100/90 text-left">
                  {entry["School Name"]}
                </div>
                <div className="text-base md:text-lg text-indigo-100/90 text-center">
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
