import { supabase } from '@shared/api/supabase';

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('profile_id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
