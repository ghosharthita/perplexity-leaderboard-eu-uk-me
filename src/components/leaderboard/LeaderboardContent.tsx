import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LeaderboardEntry {
  id: number;
  [key: string]: any;
}

interface LeaderboardContentProps {
  entries: LeaderboardEntry[];
  onSort: () => void;
}

const DISPLAYED_COLUMNS = [
  "#",
  "Country",
  "School Name",
  "Email Domain",
  "Activations (BTS 2025 Spring)"
];

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
        {/* Headers Container */}
        <div className="bg-[#2A2A2E] border-b border-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                {DISPLAYED_COLUMNS.map((header) => (
                  <TableHead 
                    key={header}
                    className={`
                      py-4 px-6 text-lg font-normal text-gray-400
                      ${header === "School Name" ? 'text-left' : ''}
                      ${header === "Activations (BTS 2025 Spring)" ? 'text-right' : ''}
                    `}
                  >
                    {header === "Activations (BTS 2025 Spring)" ? (
                      <Button
                        variant="ghost"
                        onClick={onSort}
                        className="h-8 flex items-center gap-1 font-normal text-gray-400 hover:text-white hover:bg-transparent text-lg"
                      >
                        {header}
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    ) : (
                      header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        {/* Scrollable Content Container */}
        <div className="max-h-[calc(70vh-80px)] overflow-auto">
          <Table>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow 
                  key={entry.id}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  <TableCell className="py-4 px-6 font-mono text-xl font-normal text-gray-300">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-lg text-gray-300">
                    {entry["Country"]}
                  </TableCell>
                  <TableCell className="py-4 px-6 italic text-lg text-gray-300">
                    {entry["School Name"]}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-lg text-gray-300">
                    {entry["Email Domain"]}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right font-mono text-xl text-teal-light font-normal">
                    {entry["Activations (BTS 2025 Spring)"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardContent;