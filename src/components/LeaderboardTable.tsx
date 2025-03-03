
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

type SupabaseTableName = "perplexity_leaderboard_1738748367828" | "leaderboard_data_1738627088110";

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

      // Filter out entries with no school name or country
      const filteredData = (data || []).filter(entry => 
        entry["School Name"] && entry["Country"]
      );

      // Parse activations as numbers for proper sorting
      const sortedData = filteredData.sort((a, b) => {
        // Convert to numbers and handle any non-numeric values
        const aValue = parseInt(a["Activations (BTS 2025 Spring)"] || "0", 10);
        const bValue = parseInt(b["Activations (BTS 2025 Spring)"] || "0", 10);
        
        // Ensure NaN values are treated as 0
        const aNumber = isNaN(aValue) ? 0 : aValue;
        const bNumber = isNaN(bValue) ? 0 : bValue;
        
        return bNumber - aNumber; // Descending order
      });

      console.log('Sorted data:', sortedData.map(item => ({
        school: item["School Name"],
        activations: item["Activations (BTS 2025 Spring)"],
        parsedActivations: parseInt(item["Activations (BTS 2025 Spring)"] || "0", 10)
      })));

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
            // Only add the new entry if it has both a school name and country
            const newEntry = payload.new as LeaderboardEntry;
            if (!newEntry["School Name"] || !newEntry["Country"]) {
              return current;
            }
            
            const newEntries = [newEntry, ...current];
            return newEntries.sort((a, b) => {
              // Convert to numbers and handle any non-numeric values
              const aValue = parseInt(a["Activations (BTS 2025 Spring)"] || "0", 10);
              const bValue = parseInt(b["Activations (BTS 2025 Spring)"] || "0", 10);
              
              // Ensure NaN values are treated as 0
              const aNumber = isNaN(aValue) ? 0 : aValue;
              const bNumber = isNaN(bValue) ? 0 : bValue;
              
              return bNumber - aNumber; // Descending order
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
      // Convert to numbers and handle any non-numeric values
      const aValue = parseInt(a["Activations (BTS 2025 Spring)"] || "0", 10);
      const bValue = parseInt(b["Activations (BTS 2025 Spring)"] || "0", 10);
      
      // Ensure NaN values are treated as 0
      const aNumber = isNaN(aValue) ? 0 : aValue;
      const bNumber = isNaN(bValue) ? 0 : bValue;
      
      return newOrder === 'asc' ? aNumber - bNumber : bNumber - aNumber;
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
