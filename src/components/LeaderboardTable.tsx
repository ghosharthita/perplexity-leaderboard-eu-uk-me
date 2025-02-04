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
  data: any;
  created_at: string;
}

export function LeaderboardTable() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('webhook_entries')
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
          table: 'webhook_entries'
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
  }, []);

  const renderTableHeaders = () => {
    if (entries.length === 0) return null;
    const firstEntry = entries[0].data;
    return Object.keys(firstEntry).map((header) => (
      <TableHead key={header}>{header}</TableHead>
    ));
  };

  const renderTableRow = (entry: LeaderboardEntry) => {
    return Object.values(entry.data).map((value, index) => (
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