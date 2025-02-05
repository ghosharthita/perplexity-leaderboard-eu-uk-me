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
      <div className="flex items-center gap-2 mb-6">
        <img 
          src="/lovable-uploads/8ba139b6-6d12-4b10-9f32-13bca46b964b.png" 
          alt="Perplexity Logo" 
          className="h-8 w-auto"
        />
        <h1 className="text-2xl font-bold tracking-tight">
          Race to 500
        </h1>
      </div>

      <Card className="bg-[#f8f8f8] border-none shadow-lg">
        <CardContent className="p-6">
          <div className="rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-gray-200">
                  {DISPLAYED_COLUMNS.map((header) => (
                    <TableHead 
                      key={header}
                      className="bg-white text-lg font-semibold text-gray-900"
                    >
                      {header === "Activations (BTS 2025 Spring)" ? (
                        <Button
                          variant="ghost"
                          onClick={handleSort}
                          className="h-8 flex items-center gap-1 text-lg font-semibold"
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
                      border-b border-gray-100
                      ${index < 3 ? 'bg-orange-50' : 'bg-white'}
                    `}
                  >
                    <TableCell className="font-mono text-xl">
                      {index + 1}
                    </TableCell>
                    {DISPLAYED_COLUMNS.slice(1).map((column) => (
                      <TableCell 
                        key={column}
                        className={`
                          text-lg
                          ${column === "Activations (BTS 2025 Spring)" ? 'font-mono text-orange-500 font-semibold' : ''}
                          ${column === "School Name" ? 'font-serif italic' : ''}
                        `}
                      >
                        {typeof entry[column] === 'object' 
                          ? JSON.stringify(entry[column]) 
                          : String(entry[column] || '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
