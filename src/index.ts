export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  drizzle: {
    Tables: {
      __drizzle_migrations: {
        Row: {
          created_at: number | null
          hash: string
          id: number
        }
        Insert: {
          created_at?: number | null
          hash: string
          id?: number
        }
        Update: {
          created_at?: number | null
          hash?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  graphql: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _internal_resolve: {
        Args: {
          query: string
          variables?: Json
          operationName?: string
          extensions?: Json
        }
        Returns: Json
      }
      comment_directive: {
        Args: {
          comment_: string
        }
        Returns: Json
      }
      exception: {
        Args: {
          message: string
        }
        Returns: string
      }
      get_schema_version: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      resolve: {
        Args: {
          query: string
          variables?: Json
          operationName?: string
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          provider_account_id: string
          refresh_token: string | null
          refresh_token_expires_in: number | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          refresh_token_expires_in?: number | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          refresh_token_expires_in?: number | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string | null
          details: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          details?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          details?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          avatar_url: string | null
          id: string
          is_admin: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          id?: string
          is_admin?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          is_admin?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: string | null
          participant_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          participant_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          participant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_conversations_id_fk"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_participant_id_users_id_fk"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          id: string
          type: string | null
          unread_count: number | null
        }
        Insert: {
          id?: string
          type?: string | null
          unread_count?: number | null
        }
        Update: {
          id?: string
          type?: string | null
          unread_count?: number | null
        }
        Relationships: []
      }
      files: {
        Row: {
          created_at: string | null
          id: string
          modified_at: string | null
          name: string | null
          path: string | null
          preview: string | null
          size: number | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          name?: string | null
          path?: string | null
          preview?: string | null
          size?: number | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          modified_at?: string | null
          name?: string | null
          path?: string | null
          preview?: string | null
          size?: number | null
          type?: string | null
        }
        Relationships: []
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_posts_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_tags_id_fk"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          cover_url: string | null
          created_at: string | null
          created_by_id: string
          description: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          publish: string | null
          tags: string[] | null
          title: string
          total_comments: number | null
          total_favorites: number | null
          total_shares: number | null
          total_views: number | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          cover_url?: string | null
          created_at?: string | null
          created_by_id: string
          description?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          publish?: string | null
          tags?: string[] | null
          title: string
          total_comments?: number | null
          total_favorites?: number | null
          total_shares?: number | null
          total_views?: number | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          cover_url?: string | null
          created_at?: string | null
          created_by_id?: string
          description?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          publish?: string | null
          tags?: string[] | null
          title?: string
          total_comments?: number | null
          total_favorites?: number | null
          total_shares?: number | null
          total_views?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_created_by_id_users_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          image_id: string | null
          product_id: string | null
        }
        Insert: {
          image_id?: string | null
          product_id?: string | null
        }
        Update: {
          image_id?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_image_id_files_id_fk"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_products_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          description: string | null
          due: string | null
          id: string
          labels: string[] | null
          name: string | null
          priority: string | null
          reporter: string | null
          status: string | null
        }
        Insert: {
          description?: string | null
          due?: string | null
          id?: string
          labels?: string[] | null
          name?: string | null
          priority?: string | null
          reporter?: string | null
          status?: string | null
        }
        Update: {
          description?: string | null
          due?: string | null
          id?: string
          labels?: string[] | null
          name?: string | null
          priority?: string | null
          reporter?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_reporter_users_id_fk"
            columns: ["reporter"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          about: string | null
          address: string | null
          city: string | null
          country: string | null
          display_name: string | null
          email: string
          id: string
          is_public: boolean | null
          password: string
          phone_number: string | null
          photo_url: string | null
          role: string | null
          state: string | null
          zip_code: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          display_name?: string | null
          email: string
          id?: string
          is_public?: boolean | null
          password: string
          phone_number?: string | null
          photo_url?: string | null
          role?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          display_name?: string | null
          email?: string
          id?: string
          is_public?: boolean | null
          password?: string
          phone_number?: string | null
          photo_url?: string | null
          role?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  supabase_migrations: {
    Tables: {
      schema_migrations: {
        Row: {
          name: string | null
          statements: string[] | null
          version: string
        }
        Insert: {
          name?: string | null
          statements?: string[] | null
          version: string
        }
        Update: {
          name?: string | null
          statements?: string[] | null
          version?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  vault: {
    Tables: {
      secrets: {
        Row: {
          created_at: string
          description: string
          id: string
          key_id: string | null
          name: string | null
          nonce: string | null
          secret: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "decrypted_key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "valid_key"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      decrypted_secrets: {
        Row: {
          created_at: string | null
          decrypted_secret: string | null
          description: string | null
          id: string | null
          key_id: string | null
          name: string | null
          nonce: string | null
          secret: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "decrypted_key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "valid_key"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_secret: {
        Args: {
          new_secret: string
          new_name?: string
          new_description?: string
          new_key_id?: string
        }
        Returns: string
      }
      update_secret: {
        Args: {
          secret_id: string
          new_secret?: string
          new_name?: string
          new_description?: string
          new_key_id?: string
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
