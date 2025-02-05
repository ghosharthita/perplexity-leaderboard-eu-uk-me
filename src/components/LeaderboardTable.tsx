import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  id: number;
  [key: string]: any;
}

interface PerplexityTable {
  table_name: string;
}

type SupabaseTableName = "perplexity_leaderboard_1738713770212" | "leaderboard_data_1738627088110";

const DISPLAYED_COLUMNS = [
  "#",
  "Country",
  "School Name",
  "Email Domain",
  "Activations (BTS 2025 Spring)"
];

export function LeaderboardTable() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [latestTable, setLatestTable] = useState<SupabaseTableName | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Function to get the latest perplexity_leaderboard table
    const getLatestTable = async () => {
      const { data, error } = await supabase
        .rpc('get_perplexity_tables') as { data: PerplexityTable[] | null, error: any };

      if (error) {
        console.error('Error fetching tables:', error);
        return;
      }

      if (data && data.length > 0) {
        // Sort by table name to get the latest one (they contain timestamps)
        const sortedTables = data.sort((a, b) => b.table_name.localeCompare(a.table_name));
        setLatestTable(sortedTables[0].table_name as SupabaseTableName);
      }
    };

    getLatestTable();
  }, []);

  useEffect(() => {
    if (!latestTable) return;

    // Fetch initial data from the latest table
    const fetchData = async () => {
      const { data, error } = await supabase
        .from(latestTable)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setEntries(data || []);
    };

    fetchData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: latestTable
        },
        (payload) => {
          console.log('New entry:', payload);
          setEntries(current => [payload.new as LeaderboardEntry, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [latestTable]);

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    const sortedEntries = [...entries].sort((a, b) => {
      const aValue = parseInt(a["Activations (BTS 2025 Spring)"] || "0", 10);
      const bValue = parseInt(b["Activations (BTS 2025 Spring)"] || "0", 10);
      return newOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
    
    setEntries(sortedEntries);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-4 mb-16">
        <img 
          src="/lovable-uploads/03ef7d83-87db-49cb-ab0c-4973b7598e6d.png" 
          alt="Perplexity Logo" 
          className="h-16 w-auto mb-6"
        />
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Perplexity Middle East, Europe & UK Leaderboard
        </h1>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center gap-6">
          <p className="text-gray-400 text-xl">No data available</p>
          <p className="text-gray-500">Last updated: {new Date().toLocaleString()}</p>
        </div>
      ) : (
        <Card className="bg-transparent border-none shadow-none overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-800">
                  {DISPLAYED_COLUMNS.map((header) => (
                    <TableHead 
                      key={header}
                      className={`
                        py-4 px-6 text-sm font-semibold text-gray-400
                        ${header === "School Name" ? 'text-left' : ''}
                        ${header === "Activations (BTS 2025 Spring)" ? 'text-right' : ''}
                      `}
                    >
                      {header === "Activations (BTS 2025 Spring)" ? (
                        <Button
                          variant="ghost"
                          onClick={handleSort}
                          className="h-8 flex items-center gap-1 font-semibold text-gray-400 hover:text-white hover:bg-transparent"
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
              <TableBody>
                {entries.map((entry, index) => (
                  <TableRow 
                    key={entry.id}
                    className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                  >
                    <TableCell className="py-4 px-6 font-mono text-lg font-semibold text-gray-300">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-300">
                      {entry["Country"]}
                    </TableCell>
                    <TableCell className="py-4 px-6 font-serif italic text-gray-300">
                      {entry["School Name"]}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-300">
                      {entry["Email Domain"]}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right font-mono text-[#5CCDC9] font-semibold">
                      {entry["Activations (BTS 2025 Spring)"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}