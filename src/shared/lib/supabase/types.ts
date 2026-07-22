export type Json =
  string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          id: string
          user_id: string
          title: string
          author: string | null
          cover_url: string | null
          status: 'reading' | 'finished' | 'paused' | 'wishlist'
          started_at: string | null
          finished_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          author?: string | null
          cover_url?: string | null
          status?: 'reading' | 'finished' | 'paused' | 'wishlist'
          started_at?: string | null
          finished_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          author?: string | null
          cover_url?: string | null
          status?: 'reading' | 'finished' | 'paused' | 'wishlist'
          started_at?: string | null
          finished_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      book_notes: {
        Row: {
          id: string
          user_id: string
          book_id: string | null
          content: string
          note_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          book_id?: string | null
          content: string
          note_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          book_id?: string | null
          content?: string
          note_date?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      note_tags: {
        Row: {
          note_id: string
          tag_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          note_id: string
          tag_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          note_id?: string
          tag_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      streaks: {
        Row: {
          user_id: string
          streak_date: string
          note_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          streak_date: string
          note_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          streak_date?: string
          note_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      book_status: 'reading' | 'finished' | 'paused' | 'wishlist'
    }
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
