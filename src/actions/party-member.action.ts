"use server";

import { createClient } from "@/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function getAllCharacters(partyId: string, job?: string) {
  const supabase = createClient();

  const { error: authError } = await supabase.auth.getUser();

  if (authError) {
    return { error: authError.message, data: [] };
  }

  const { data: members, error: membersError } = await supabase
    .from("party_members")
    .select("character_id, parties( size )")
    .eq("party_id", partyId);

  if (membersError) {
    return { error: membersError.message as string, data: [] };
  }

  let partySize!: number;

  if (members.length) {
    partySize = members[0].parties?.size as number;
  }

  const charactersId = members?.map((member) => member.character_id);

  if (charactersId.length >= partySize) {
    return { error: "สมาชิกปาร์ตี้เต็มแล้ว", data: [] };
  }

  const charactersWithProfileQuery = supabase
    .from("characters")
    .select(`id, name, job, image, profiles( global_name, full_name, user_id )`)
    .not("id", "in", `(${charactersId})`);

  if (job) {
    charactersWithProfileQuery.eq("job", job);
  }

  type CharactersWithProfile = QueryData<typeof charactersWithProfileQuery>;

  const { data: characters, error: charactersError } =
    await charactersWithProfileQuery;

  const charactersWithProfile: CharactersWithProfile = characters || [];

  if (charactersError) {
    return { error: charactersError?.message as string, data: [] };
  }

  return { error: null, data: charactersWithProfile };
}

export async function getMySchedule() {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    return { error: authError.message, data: [] };
  }

  const { data: characters, error: charactersError } = await supabase
    .from("characters")
    .select("id")
    .eq("user_id", user?.id as string);

  if (charactersError) {
    return { error: charactersError.message, data: [] };
  }

  const charsId = characters?.map((char) => char.id);

  const partiesQuery = supabase
    .from("party_members")
    .select("parties( * )")
    .in("character_id", charsId);

  type MyScheduleType = QueryData<typeof partiesQuery>;

  const { data, error } = await partiesQuery;

  if (error) {
    return { error: error.message, data: [] };
  }

  const mySchedule: MyScheduleType = data;

  return { error: null, data: mySchedule.map((i) => i.parties) };
}

export async function getAllMembers(partyId: string) {
  const supabase = createClient();

  const { error: authError } = await supabase.auth.getUser();

  if (authError) {
    return { error: authError.message, data: [] };
  }

  const membersWithDataQuery = supabase
    .from("party_members")
    .select(
      `
      id,
      characters (id, name, job, image, profiles( global_name, full_name ))
      `
    )
    .eq("party_id", partyId);

  type MembersWithData = QueryData<typeof membersWithDataQuery>;

  const { data: members, error: membersError } = await membersWithDataQuery;

  if (membersError) {
    return { error: membersError.message as string, data: [] };
  }

  const membersWithData: MembersWithData = members;

  return { error: null, data: membersWithData };
}

export async function addToParty(
  partyId: string,
  characterId: string,
  userId: string
) {
  const supabase = createClient();

  const { error: authError } = await supabase.auth.getUser();

  if (authError) {
    return { error: authError.message };
  }

  const { data: chars, error: charsError } = await supabase
    .from("characters")
    .select("id")
    .eq("user_id", userId);

  if (charsError) {
    return { error: charsError.message };
  }

  const charsId = chars.map((char) => char.id);

  const { data } = await supabase
    .from("party_members")
    .select("id")
    .in("character_id", charsId);

  if (data?.length) {
    return { error: "ผู้เล่นนี้มีตัวละครอยู่ในปาร์ตี้แล้ว" };
  }

  const { error: insertError } = await supabase
    .from("party_members")
    .insert({ party_id: partyId, character_id: characterId });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/mycharacters/[partyId]", "page");
  return { error: null };
}

export async function kickFromParty(characterId: string) {
  const supabase = createClient();

  const { error: authError } = await supabase.auth.getUser();

  if (authError) {
    return { error: authError.message };
  }

  const { error: deleteError } = await supabase
    .from("party_members")
    .delete()
    .eq("character_id", characterId);

  if (deleteError) {
    return { error: deleteError.message };
  }

  revalidatePath("/mycharacters/[partyId]", "page");
  return { error: null };
}
