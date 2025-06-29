import { supabase } from '@shared/api/supabase';

export const toggleVillageLike = async ({
  villageId,
  userId
}: {
  villageId: string;
  userId: string;
}) => {
  const { count } = await supabase
    .from('villages_likes')
    .select('*', { count: 'exact', head: true })
    .eq('village_id', Number(villageId))
    .eq('profile_id', userId);
  if (count === 0) {
    await supabase.from('villages_likes').insert({
      village_id: Number(villageId),
      profile_id: userId
    });
  } else {
    await supabase
      .from('villages_likes')
      .delete()
      .eq('village_id', Number(villageId))
      .eq('profile_id', userId);
  }
};
