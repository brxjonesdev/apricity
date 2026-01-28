export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chapter: {
        Row: {
          created_at: string
          id: number
          manuscript_id: number | null
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          manuscript_id?: number | null
          position: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          manuscript_id?: number | null
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_manuscript_id_fkey"
            columns: ["manuscript_id"]
            isOneToOne: false
            referencedRelation: "manuscript"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_content: {
        Row: {
          chapter_id: number
          content_id: number
          created_at: string
          id: number
          position: number
          type: string | null
          updated_at: string
        }
        Insert: {
          chapter_id: number
          content_id: number
          created_at?: string
          id?: number
          position: number
          type?: string | null
          updated_at?: string
        }
        Update: {
          chapter_id?: number
          content_id?: number
          created_at?: string
          id?: number
          position?: number
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_content_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapter_content_content_id_fkey1"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapter_content_content_id_fkey2"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "scene"
            referencedColumns: ["id"]
          },
        ]
      }
      image: {
        Row: {
          alt_text: string
          created_at: string
          id: number
          updated_at: string
          url: string
        }
        Insert: {
          alt_text: string
          created_at?: string
          id?: number
          updated_at: string
          url: string
        }
        Update: {
          alt_text?: string
          created_at?: string
          id?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      manuscript: {
        Row: {
          created_at: string
          id: number
          position: number
          story_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          position: number
          story_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          position?: number
          story_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "manuscript_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      projects: {
        Row: {
          blurb: string | null
          created_at: string
          name: string
          project_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          blurb?: string | null
          created_at?: string
          name: string
          project_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          blurb?: string | null
          created_at?: string
          name?: string
          project_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["auth_id"]
          },
        ]
      }
      scene: {
        Row: {
          content: string | null
          created_at: string
          id: number
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          updated_at: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          auth_id: string
          created_at: string
          display_name: string
          id: number
          updated_at: string
          username: string
        }
        Insert: {
          auth_id: string
          created_at?: string
          display_name: string
          id?: number
          updated_at?: string
          username: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          display_name?: string
          id?: number
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_chapter_cascade: {
        Args: { chapter_id: number }
        Returns: undefined
      }
      delete_manuscript_cascade: {
        Args: { manuscript_id: number }
        Returns: undefined
      }
      get_chapter_contents: {
        Args: { chapter_id: number }
        Returns: {
          content_id: number
          id: number
          position: number
          type: string
        }[]
      }
      get_manuscript_chapters: {
        Args: { manuscript_id: number }
        Returns: {
          id: number
          position: number
          title: string
        }[]
      }
      shift_chapter_content_positions: {
        Args: { chapter_id: number; shift: number; start_position: number }
        Returns: undefined
      }
      shift_chapter_positions: {
        Args: { manuscript_id: number; shift: number; start_position: number }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
