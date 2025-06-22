import { ENV } from '@shared/constants/config';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(ENV.supabase.url, ENV.supabase.anonKey);
