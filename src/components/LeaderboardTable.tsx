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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface LeaderboardEntry {
  id: number;
  [key: string]: any;
}

export function LeaderboardTable() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [latestTable, setLatestTable] = useState<string | null>(null);

  useEffect(() => {
    // Function to get the latest perplexity_leaderboard table
    const getLatestTable = async () => {
      const { data, error } = await supabase
        .rpc('get_perplexity_tables')

      if (error) {
        console.error('Error fetching tables:', error);
        return;
      }

      if (data && data.length > 0) {
        // Sort by table name to get the latest one (they contain timestamps)
        const sortedTables = data.sort((a, b) => b.table_name.localeCompare(a.table_name));
        setLatestTable(sortedTables[0].table_name);
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

  const renderTableHeaders = () => {
    if (entries.length === 0) return null;
    const firstEntry = entries[0];
    return Object.keys(firstEntry)
      .filter(key => key !== 'id' && key !== 'created_at')
      .map((header) => (
        <TableHead key={header}>{header}</TableHead>
      ));
  };

  const renderTableRow = (entry: LeaderboardEntry) => {
    return Object.entries(entry)
      .filter(([key]) => key !== 'id' && key !== 'created_at')
      .map(([_, value], index) => (
        <TableCell key={index}>
          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
        </TableCell>
      ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Perplexity Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>{renderTableHeaders()}</TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  {renderTableRow(entry)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}