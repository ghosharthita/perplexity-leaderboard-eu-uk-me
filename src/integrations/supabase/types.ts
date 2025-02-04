export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leaderboard_data_1738627088110: {
        Row: {
          "Activations (BTS 2025 Spring)": string | null
          Country: string | null
          created_at: string | null
          "Email Domain": string | null
          id: number
          Queries: string | null
          "Queries (from BTS 2025 Spring Registrations)": string | null
          "School Name": string | null
          "Strategist Region": string | null
          "US State": string | null
        }
        Insert: {
          "Activations (BTS 2025 Spring)"?: string | null
          Country?: string | null
          created_at?: string | null
          "Email Domain"?: string | null
          id?: number
          Queries?: string | null
          "Queries (from BTS 2025 Spring Registrations)"?: string | null
          "School Name"?: string | null
          "Strategist Region"?: string | null
          "US State"?: string | null
        }
        Update: {
          "Activations (BTS 2025 Spring)"?: string | null
          Country?: string | null
          created_at?: string | null
          "Email Domain"?: string | null
          id?: number
          Queries?: string | null
          "Queries (from BTS 2025 Spring Registrations)"?: string | null
          "School Name"?: string | null
          "Strategist Region"?: string | null
          "US State"?: string | null
        }
        Relationships: []
      }
      leaderboard_entries: {
        Row: {
          created_at: string
          headers: string[]
          id: number
          rows: Json
        }
        Insert: {
          created_at?: string
          headers: string[]
          id?: number
          rows: Json
        }
        Update: {
          created_at?: string
          headers?: string[]
          id?: number
          rows?: Json
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: number
          referral_code: string
          signup_count: number
          strategist_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          referral_code: string
          signup_count?: number
          strategist_id: number
        }
        Update: {
          created_at?: string
          id?: number
          referral_code?: string
          signup_count?: number
          strategist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "referrals_strategist_id_fkey"
            columns: ["strategist_id"]
            isOneToOne: false
            referencedRelation: "strategists"
            referencedColumns: ["id"]
          },
        ]
      }
      strategists: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      webhook_entries: {
        Row: {
          created_at: string
          data: Json
          id: number
        }
        Insert: {
          created_at?: string
          data: Json
          id?: number
        }
        Update: {
          created_at?: string
          data?: Json
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_dynamic_table: {
        Args: {
          sql_command: string
        }
        Returns: undefined
      }
      increment_signup_count: {
        Args: {
          ref_code: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
