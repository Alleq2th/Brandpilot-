-- ==========================================
-- BRANDPILOT MODULE 1 DATABASE SCHEMA
-- USER FOUNDATION
-- ==========================================


-- Enable UUID generation
create extension if not exists "uuid-ossp";


-- ==========================================
-- USER PROFILES TABLE
-- Extends Supabase Auth users
-- ==========================================

create table if not exists public.profiles (

    id uuid primary key references auth.users(id)
    on delete cascade,


    full_name text not null,


    avatar_url text,


    created_at timestamp with time zone
    default timezone('utc'::text, now()),


    updated_at timestamp with time zone
    default timezone('utc'::text, now())

);



-- ==========================================
-- USER SETTINGS TABLE
-- Stores personal preferences
-- ==========================================

create table if not exists public.user_settings (

    id uuid primary key default uuid_generate_v4(),


    user_id uuid not null references public.profiles(id)
    on delete cascade,


    theme text default 'dark',


    timezone text default 'UTC',


    created_at timestamp with time zone
    default timezone('utc'::text, now())

);



-- ==========================================
-- ROW LEVEL SECURITY
-- Protect user data
-- ==========================================

alter table public.profiles
enable row level security;


alter table public.user_settings
enable row level security;



-- ==========================================
-- PROFILE POLICIES
-- ==========================================

create policy "Users can view own profile"

on public.profiles

for select

using (
    auth.uid() = id
);



create policy "Users can update own profile"

on public.profiles

for update

using (
    auth.uid() = id
);



-- ==========================================
-- SETTINGS POLICIES
-- ==========================================

create policy "Users can view own settings"

on public.user_settings

for select

using (
    auth.uid() = user_id
);



create policy "Users can update own settings"

on public.user_settings

for update

using (
    auth.uid() = user_id
);



-- ==========================================
-- AUTO CREATE PROFILE AFTER SIGNUP
-- ==========================================

create or replace function public.handle_new_user()

returns trigger

language plpgsql

security definer set search_path = public

as $$

begin

insert into public.profiles (
    id,
    full_name
)

values (

    new.id,

    new.raw_user_meta_data->>'name'

);


return new;

end;

$$;



create trigger on_auth_user_created

after insert on auth.users

for each row

execute procedure public.handle_new_user();
