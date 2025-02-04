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
  "Strategist Region": string | null;
  Country: string | null;
  "US State": string | null;
  "School Name": string | null;
  "Email Domain": string | null;
  "Activations (BTS 2025 Spring)": string | null;
  "Queries (from BTS 2025 Spring Registrations)": string | null;
  Queries: string | null;
  created_at: string | null;
}

export function LeaderboardTable() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('leaderboard_data_1738627088110')
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
          table: 'leaderboard_data_1738627088110'
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
    const headers = [
      "Strategist Region",
      "Country",
      "US State",
      "School Name",
      "Email Domain",
      "Activations (BTS 2025 Spring)",
      "Queries (from BTS 2025 Spring Registrations)",
      "Queries"
    ];
    return headers.map((header) => (
      <TableHead key={header}>{header}</TableHead>
    ));
  };

  const renderTableRow = (entry: LeaderboardEntry) => {
    const values = [
      entry["Strategist Region"],
      entry.Country,
      entry["US State"],
      entry["School Name"],
      entry["Email Domain"],
      entry["Activations (BTS 2025 Spring)"],
      entry["Queries (from BTS 2025 Spring Registrations)"],
      entry.Queries
    ];
    return values.map((value, index) => (
      <TableCell key={index}>
        {value || '-'}
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