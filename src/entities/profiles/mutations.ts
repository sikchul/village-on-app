import { supabase } from '@shared/api/supabase';

export const updateProfile = async ({
  profileId,
  nickname,
  avatar
}: {
  profileId: string;
  nickname: string;
  avatar?: File | null;
}) => {
  let avatarUrl = '';

  if (avatar) {
    const fileExt = avatar.name.split('.').pop();
    const fileName = `avatar.${fileExt}`;
    const filePath = `${profileId}/${fileName}`;

    try {
      await supabase.storage.from('avatars').remove([filePath]);
    } catch {
      throw new Error('Failed to remove existing avatar');
    }

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatar);

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl }
    } = supabase.storage.from('avatars').getPublicUrl(filePath);

    avatarUrl = publicUrl;
  }

  const updateData: { nickname: string; avatar?: string } = { nickname };

  if (avatarUrl) {
    updateData.avatar = avatarUrl;
  }

  const { error } = await supabase.from('profiles').update(updateData).eq('profile_id', profileId);

  if (error) {
    throw error;
  }
};
