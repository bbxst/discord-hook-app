"use server";

import { Tables } from "@/supabase/database.types";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCharacter(newChar: Tables<"characters">) {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (!auth || authError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน" };
  }

  const { error } = await supabase.from("characters").insert(newChar);

  if (error) {
    return { success: false, message: "เพิ่มตัวละครไม่สำเร็จ" };
  }

  revalidatePath("/characters");
  return { success: true, message: "เพิ่มตัวละครสำเร็จ" };
}

export async function getCharacters() {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (!auth || authError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน", data: [] };
  }

  const { data: characters, error: charError } = await supabase
    .from("characters")
    .select("*")
    .eq("user_id", auth.user.id);

  if (charError) {
    return { success: false, message: "เกิดข้อผิดพลาด", data: [] };
  }

  if (!characters) {
    return { success: false, message: "ไม่พบตัวละคร", data: [] };
  }

  revalidatePath("/characters");
  return { success: true, message: "", data: characters };
}

export async function deleteCharacter(charId: string) {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (!auth || authError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน" };
  }

  const { error } = await supabase.from("characters").delete().eq("id", charId);

  if (error) {
    return { success: false, message: "ลบตัวละครไม่สำเร็จ" };
  }

  revalidatePath("/characters");
  return { success: true, message: "ลบตัวละครสำเร็จ" };
}
