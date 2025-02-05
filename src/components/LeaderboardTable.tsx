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
      <div className="flex items-center gap-4 mb-8">
        <img 
          src="/lovable-uploads/8ba139b6-6d12-4b10-9f32-13bca46b964b.png" 
          alt="Perplexity Logo" 
          className="h-10 w-auto"
        />
        <h1 className="text-2xl font-bold tracking-tight">
          Race to 500
        </h1>
      </div>

      <Card className="bg-white border-none shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                {DISPLAYED_COLUMNS.map((header) => (
                  <TableHead 
                    key={header}
                    className={`
                      py-4 px-6 text-sm font-semibold text-gray-900
                      ${header === "School Name" ? 'text-left' : ''}
                      ${header === "Activations (BTS 2025 Spring)" ? 'text-right' : ''}
                    `}
                  >
                    {header === "Activations (BTS 2025 Spring)" ? (
                      <Button
                        variant="ghost"
                        onClick={handleSort}
                        className="h-8 flex items-center gap-1 font-semibold hover:bg-transparent"
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
                  className={`
                    border-b border-gray-100 hover:bg-gray-50 transition-colors
                    ${index < 3 ? 'bg-orange-50/50' : 'bg-white'}
                  `}
                >
                  <TableCell className="py-4 px-6 font-mono text-lg font-semibold">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {entry["Country"]}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-serif italic">
                    {entry["School Name"]}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {entry["Email Domain"]}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right font-mono text-orange-500 font-semibold">
                    {entry["Activations (BTS 2025 Spring)"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
