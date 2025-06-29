drop function if exists public.handle_new_user() CASCADE;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if new.raw_app_meta_data is not null then
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
            insert into public.profiles (profile_id, nickname, useremail, avatar)
            values (
              new.id,
              new.raw_user_meta_data ->> 'name' || substr(md5(random()::text), 1, 5),
              new.email,
              replace(new.raw_user_meta_data ->> 'picture', 'http://', 'https://')
            );
         end if;
    end if;
    return new;
end;
$$;

create trigger profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();