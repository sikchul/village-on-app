export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar: string
          created_at: string
          nickname: string
          profile_id: string
          updated_at: string
          useremail: string
        }
        Insert: {
          avatar: string
          created_at?: string
          nickname: string
          profile_id: string
          updated_at?: string
          useremail: string
        }
        Update: {
          avatar?: string
          created_at?: string
          nickname?: string
          profile_id?: string
          updated_at?: string
          useremail?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          likes: number
          profile_id: string | null
          review_id: number
          review_images: string[] | null
          village_id: number | null
        }
        Insert: {
          comment: string
          created_at?: string
          likes?: number
          profile_id?: string | null
          review_id?: number
          review_images?: string[] | null
          village_id?: number | null
        }
        Update: {
          comment?: string
          created_at?: string
          likes?: number
          profile_id?: string | null
          review_id?: number
          review_images?: string[] | null
          village_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_home_village_list"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_village_detail_view"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["village_id"]
          },
        ]
      }
      reviews_likes: {
        Row: {
          profile_id: string
          review_id: number
        }
        Insert: {
          profile_id: string
          review_id: number
        }
        Update: {
          profile_id?: string
          review_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_likes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reviews_likes_review_id_reviews_review_id_fk"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "get_review_detail_view"
            referencedColumns: ["review_id"]
          },
          {
            foreignKeyName: "reviews_likes_review_id_reviews_review_id_fk"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "get_review_list_view"
            referencedColumns: ["review_id"]
          },
          {
            foreignKeyName: "reviews_likes_review_id_reviews_review_id_fk"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["review_id"]
          },
        ]
      }
      villages: {
        Row: {
          appn_date: string
          ctprvn_nm: string
          exprn_ar: string
          exprn_cn: string
          exprn_pic_url: string
          exprn_se: string
          exprn_village_nm: string
          hold_fclty: string
          homepage_url: string
          institution_nm: string
          instt_code: string
          instt_nm: string
          latitude: string
          likes: number
          lnmadr: string
          longitude: string
          phone_number: string
          rdnmadr: string
          reference_date: string
          rprsntv_nm: string
          signgu_nm: string
          village_id: number
        }
        Insert: {
          appn_date?: string
          ctprvn_nm?: string
          exprn_ar?: string
          exprn_cn?: string
          exprn_pic_url?: string
          exprn_se?: string
          exprn_village_nm?: string
          hold_fclty?: string
          homepage_url?: string
          institution_nm?: string
          instt_code?: string
          instt_nm?: string
          latitude?: string
          likes?: number
          lnmadr?: string
          longitude?: string
          phone_number?: string
          rdnmadr?: string
          reference_date?: string
          rprsntv_nm?: string
          signgu_nm?: string
          village_id?: number
        }
        Update: {
          appn_date?: string
          ctprvn_nm?: string
          exprn_ar?: string
          exprn_cn?: string
          exprn_pic_url?: string
          exprn_se?: string
          exprn_village_nm?: string
          hold_fclty?: string
          homepage_url?: string
          institution_nm?: string
          instt_code?: string
          instt_nm?: string
          latitude?: string
          likes?: number
          lnmadr?: string
          longitude?: string
          phone_number?: string
          rdnmadr?: string
          reference_date?: string
          rprsntv_nm?: string
          signgu_nm?: string
          village_id?: number
        }
        Relationships: []
      }
      villages_likes: {
        Row: {
          profile_id: string
          village_id: number
        }
        Insert: {
          profile_id: string
          village_id: number
        }
        Update: {
          profile_id?: string
          village_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "villages_likes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "villages_likes_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_home_village_list"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "villages_likes_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_village_detail_view"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "villages_likes_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["village_id"]
          },
        ]
      }
    }
    Views: {
      get_home_village_list: {
        Row: {
          appn_date: string | null
          ctprvn_nm: string | null
          exprn_ar: string | null
          exprn_cn: string | null
          exprn_pic_url: string | null
          exprn_se: string | null
          exprn_village_nm: string | null
          hold_fclty: string | null
          homepage_url: string | null
          institution_nm: string | null
          instt_code: string | null
          instt_nm: string | null
          latitude: string | null
          likes: number | null
          lnmadr: string | null
          longitude: string | null
          phone_number: string | null
          rdnmadr: string | null
          reference_date: string | null
          rprsntv_nm: string | null
          signgu_nm: string | null
          village_id: number | null
        }
        Relationships: []
      }
      get_review_detail_view: {
        Row: {
          avatar: string | null
          comment: string | null
          created_at: string | null
          exprn_village_nm: string | null
          is_liked: boolean | null
          is_my_review: boolean | null
          latitude: string | null
          likes: number | null
          longitude: string | null
          nickname: string | null
          phone_number: string | null
          profile_id: string | null
          rdnmadr: string | null
          review_id: number | null
          review_images: string[] | null
          village_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_home_village_list"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_village_detail_view"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["village_id"]
          },
        ]
      }
      get_review_list_view: {
        Row: {
          avatar: string | null
          comment: string | null
          created_at: string | null
          exprn_village_nm: string | null
          likes: number | null
          nickname: string | null
          profile_id: string | null
          review_id: number | null
          review_images: string[] | null
          village_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_home_village_list"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "get_village_detail_view"
            referencedColumns: ["village_id"]
          },
          {
            foreignKeyName: "reviews_village_id_villages_village_id_fk"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["village_id"]
          },
        ]
      }
      get_village_detail_view: {
        Row: {
          appn_date: string | null
          ctprvn_nm: string | null
          exprn_ar: string | null
          exprn_cn: string | null
          exprn_pic_url: string | null
          exprn_se: string | null
          exprn_village_nm: string | null
          hold_fclty: string | null
          homepage_url: string | null
          institution_nm: string | null
          instt_code: string | null
          instt_nm: string | null
          is_liked: boolean | null
          latitude: string | null
          likes: number | null
          lnmadr: string | null
          longitude: string | null
          phone_number: string | null
          rdnmadr: string | null
          reference_date: string | null
          rprsntv_nm: string | null
          signgu_nm: string | null
          village_id: number | null
        }
        Insert: {
          appn_date?: string | null
          ctprvn_nm?: string | null
          exprn_ar?: string | null
          exprn_cn?: string | null
          exprn_pic_url?: string | null
          exprn_se?: string | null
          exprn_village_nm?: string | null
          hold_fclty?: string | null
          homepage_url?: string | null
          institution_nm?: string | null
          instt_code?: string | null
          instt_nm?: string | null
          is_liked?: never
          latitude?: string | null
          likes?: number | null
          lnmadr?: string | null
          longitude?: string | null
          phone_number?: string | null
          rdnmadr?: string | null
          reference_date?: string | null
          rprsntv_nm?: string | null
          signgu_nm?: string | null
          village_id?: number | null
        }
        Update: {
          appn_date?: string | null
          ctprvn_nm?: string | null
          exprn_ar?: string | null
          exprn_cn?: string | null
          exprn_pic_url?: string | null
          exprn_se?: string | null
          exprn_village_nm?: string | null
          hold_fclty?: string | null
          homepage_url?: string | null
          institution_nm?: string | null
          instt_code?: string | null
          instt_nm?: string | null
          is_liked?: never
          latitude?: string | null
          likes?: number | null
          lnmadr?: string | null
          longitude?: string | null
          phone_number?: string | null
          rdnmadr?: string | null
          reference_date?: string | null
          rprsntv_nm?: string | null
          signgu_nm?: string | null
          village_id?: number | null
        }
        Relationships: []
      }
      get_village_location_list: {
        Row: {
          institution_nm: string | null
        }
        Relationships: []
      }
      get_village_type_list: {
        Row: {
          type_name: string | null
        }
        Relationships: []
      }
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
