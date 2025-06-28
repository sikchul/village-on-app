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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
