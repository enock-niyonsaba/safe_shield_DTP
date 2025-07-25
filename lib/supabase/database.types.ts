export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: "admin" | "analyst" | "observer"
          status: "active" | "pending" | "inactive"
          created_at: string
          updated_at: string
          avatar_url: string | null
          department: string | null
          phone: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: "admin" | "analyst" | "observer"
          status?: "active" | "pending" | "inactive"
          created_at?: string
          updated_at?: string
          avatar_url?: string | null
          department?: string | null
          phone?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: "admin" | "analyst" | "observer"
          status?: "active" | "pending" | "inactive"
          created_at?: string
          updated_at?: string
          avatar_url?: string | null
          department?: string | null
          phone?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: "Admin" | "Analyst" | "Observer"
          status: "active" | "pending" | "suspended"
          avatar_url: string | null
          department: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: "Admin" | "Analyst" | "Observer"
          status?: "active" | "pending" | "suspended"
          avatar_url?: string | null
          department?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: "Admin" | "Analyst" | "Observer"
          status?: "active" | "pending" | "suspended"
          avatar_url?: string | null
          department?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      incidents: {
        Row: {
          id: string
          title: string
          description: string
          severity: "Low" | "Medium" | "High" | "Critical"
          status: "Open" | "In Progress" | "Resolved" | "Closed"
          reporter_id: string
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          severity: "Low" | "Medium" | "High" | "Critical"
          status?: "Open" | "In Progress" | "Resolved" | "Closed"
          reporter_id: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          severity?: "Low" | "Medium" | "High" | "Critical"
          status?: "Open" | "In Progress" | "Resolved" | "Closed"
          reporter_id?: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      evidence: {
        Row: {
          id: string
          incident_id: string
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_by: string
          uploaded_at: string
          description: string | null
        }
        Insert: {
          id?: string
          incident_id: string
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          uploaded_by: string
          uploaded_at?: string
          description?: string | null
        }
        Update: {
          id?: string
          incident_id?: string
          file_name?: string
          file_path?: string
          file_type?: string
          file_size?: number
          uploaded_by?: string
          uploaded_at?: string
          description?: string | null
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string | null
          details: Json
          created_at: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          entity_type: string
          entity_id?: string | null
          details: Json
          created_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          entity_type?: string
          entity_id?: string | null
          details?: Json
          created_at?: string
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: "info" | "warning" | "error" | "success"
          priority: "low" | "medium" | "high"
          read: boolean
          related_link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: "info" | "warning" | "error" | "success"
          priority?: "low" | "medium" | "high"
          read?: boolean
          related_link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: "info" | "warning" | "error" | "success"
          priority?: "low" | "medium" | "high"
          read?: boolean
          related_link?: string | null
          created_at?: string
        }
      }
      training_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          progress: number
          completed: boolean
          started_at: string
          completed_at: string | null
          score: number | null
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          progress?: number
          completed?: boolean
          started_at?: string
          completed_at?: string | null
          score?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          progress?: number
          completed?: boolean
          started_at?: string
          completed_at?: string | null
          score?: number | null
        }
      }
      training_modules: {
        Row: {
          id: string
          title: string
          description: string
          duration: number
          difficulty: "beginner" | "intermediate" | "advanced"
          category: string
          created_at: string
          updated_at: string
          content_path: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          duration: number
          difficulty: "beginner" | "intermediate" | "advanced"
          category: string
          created_at?: string
          updated_at?: string
          content_path: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          duration?: number
          difficulty?: "beginner" | "intermediate" | "advanced"
          category?: string
          created_at?: string
          updated_at?: string
          content_path?: string
        }
      }
      incident_comments: {
        Row: {
          id: string
          incident_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          incident_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          incident_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      incident_assignments: {
        Row: {
          id: string
          incident_id: string
          assigned_to: string
          assigned_by: string
          assigned_at: string
          status: "pending" | "accepted" | "rejected" | "completed"
          notes: string | null
        }
        Insert: {
          id?: string
          incident_id: string
          assigned_to: string
          assigned_by: string
          assigned_at?: string
          status?: "pending" | "accepted" | "rejected" | "completed"
          notes?: string | null
        }
        Update: {
          id?: string
          incident_id?: string
          assigned_to?: string
          assigned_by?: string
          assigned_at?: string
          status?: "pending" | "accepted" | "rejected" | "completed"
          notes?: string | null
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          notification_preferences: Json
          theme: "light" | "dark" | "system"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          notification_preferences?: Json
          theme?: "light" | "dark" | "system"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          notification_preferences?: Json
          theme?: "light" | "dark" | "system"
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_incident_to_user: {
        Args: {
          incident_id: string
        }
        Returns: string
      }
      get_user_workload: {
        Args: {
          user_id: string
        }
        Returns: number
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
