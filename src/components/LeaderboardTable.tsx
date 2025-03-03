
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

  // Helper function to properly parse activation counts as numbers
  const parseActivationCount = (value: string | null): number => {
    if (!value) return 0;
    
    // Remove any non-numeric characters except decimal points
    const numericString = value.replace(/[^\d.]/g, '');
    const parsedValue = parseFloat(numericString);
    
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  // Helper function to sort entries by activation count
  const sortByActivations = (data: LeaderboardEntry[], order: 'asc' | 'desc' = 'desc') => {
    return [...data].sort((a, b) => {
      const aValue = parseActivationCount(a["Activations (BTS 2025 Spring)"]);
      const bValue = parseActivationCount(b["Activations (BTS 2025 Spring)"]);
      
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });
  };

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

      // Sort data by activations
      const sortedData = sortByActivations(filteredData, sortOrder);

      console.log('Filtered and sorted data:', sortedData.map(item => ({
        school: item["School Name"],
        activations: item["Activations (BTS 2025 Spring)"],
        parsedActivations: parseActivationCount(item["Activations (BTS 2025 Spring)"])
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
            
            // Add new entry and re-sort the entire list
            const updatedEntries = [...current, newEntry];
            return sortByActivations(updatedEntries, sortOrder);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [latestTable, sortOrder]);

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    // Sorting will be handled by the useEffect that depends on sortOrder
  };

  return (
    <div className="max-w-7xl mx-auto font-serif">
      <LeaderboardHeader />
      <LeaderboardContent entries={entries} onSort={handleSort} sortOrder={sortOrder} />
    </div>
  );
}
