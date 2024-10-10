"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPartyById(partyId: string) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { success: false, data: null };
  }

  const { data: party, error: partyError } = await supabase
    .from("parties")
    .select("*")
    .match({ id: partyId, user_id: user.id })
    .single();

  if (partyError) {
    return { success: false, data: null };
  }

  return { success: true, data: party };
}

export async function getMyParties() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { success: false, data: [] };
  }

  const { data: parties, error: partiesError } = await supabase
    .from("parties")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (partiesError) {
    return { success: false, data: [] };
  }

  return { success: true, data: parties };
}

export async function createParty(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้" };
  }

  const data = {
    user_id: user.id,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    nest: formData.get("nest") as string,
    size: Number(formData.get("size") as string),
    day: formData.get("day") as string,
    time: formData.get("time") as string,
  };

  const { error: insertError } = await supabase.from("parties").insert(data);

  if (insertError) {
    return { success: false, message: insertError.message };
  }

  revalidatePath("/");
  return { success: true, message: "สร้างปาร์ตี้สำเร็จ" };
}

export async function updateParty(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้" };
  }

  const data = {
    user_id: user.id,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    nest: formData.get("nest") as string,
    size: Number(formData.get("size") as string),
    day: formData.get("day") as string,
    time: formData.get("time") as string,
  };

  const { error: insertError } = await supabase
    .from("parties")
    .update(data)
    .eq("id", formData.get("id") as string);

  if (insertError) {
    return { success: false, message: insertError.message };
  }

  revalidatePath(`/myparties/${formData.get("id") as string}`);
  return { success: true, message: "แก้ไขรายละเอียดสำเร็จ" };
}

export async function deleteParty(partyId: string) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้" };
  }

  const { error: deleteError } = await supabase
    .from("parties")
    .delete()
    .eq("user_id", user.id)
    .eq("id", partyId);

  if (deleteError) {
    return { success: false, message: deleteError.message };
  }

  revalidatePath("/myparties");
  return { success: true, message: "ลบปาร์ตี้สำเร็จ" };
}
