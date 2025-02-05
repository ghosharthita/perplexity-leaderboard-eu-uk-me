import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import LeaderboardHeader from "./leaderboard/LeaderboardHeader";
import LeaderboardContent from "./leaderboard/LeaderboardContent";

interface LeaderboardEntry {
  id: number;
  [key: string]: any;
}

interface PerplexityTable {
  table_name: string;
}

type SupabaseTableName = "perplexity_leaderboard_1738713770212" | "leaderboard_data_1738627088110";

export function LeaderboardTable() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [latestTable, setLatestTable] = useState<SupabaseTableName | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const getLatestTable = async () => {
      const { data, error } = await supabase
        .rpc('get_perplexity_tables') as { data: PerplexityTable[] | null, error: any };

      if (error) {
        console.error('Error fetching tables:', error);
        return;
      }

      if (data && data.length > 0) {
        const sortedTables = data.sort((a, b) => b.table_name.localeCompare(a.table_name));
        setLatestTable(sortedTables[0].table_name as SupabaseTableName);
      }
    };

    getLatestTable();
  }, []);

  useEffect(() => {
    if (!latestTable) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from(latestTable)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      const sortedData = (data || []).sort((a, b) => {
        const aValue = parseInt(a["Activations (BTS 2025 Spring)"] || "0", 10);
        const bValue = parseInt(b["Activations (BTS 2025 Spring)"] || "0", 10);
        return bValue - aValue;
      });

      setEntries(sortedData);
    };

    fetchData();

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
          setEntries(current => {
            const newEntries = [payload.new as LeaderboardEntry, ...current];
            return newEntries.sort((a, b) => {
              const aValue = parseInt(a["Activations (BTS 2025 Spring)"] || "0", 10);
              const bValue = parseInt(b["Activations (BTS 2025 Spring)"] || "0", 10);
              return bValue - aValue;
            });
          });
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
    <div className="max-w-7xl mx-auto font-serif">
      <LeaderboardHeader />
      <LeaderboardContent entries={entries} onSort={handleSort} />
    </div>
  );
}