import { supabase } from '@shared/api/supabase';

export const getHomeVillageList = async () => {
  const { data, error } = await supabase.from('get_home_village_list').select('*');
  if (error) throw new Error(error.message);
  return data;
};
