"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCharacter(formData: FormData) {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (!auth || authError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน" };
  }

  const image = formData.get("image") as File;

  const dataObject = {
    user_id: auth.user.id,
    name: formData.get("name") as string,
    job: formData.get("job") as string,
    image: image.name,
    message_id: formData.get("messageId") as string,
  };

  const { error: imageError } = await supabase.storage
    .from("character_image")
    .upload(`private/${image.name}`, image);

  if (imageError) {
    return { success: false, message: "เพิ่มรูปภาพไม่สำเร็จ" };
  }

  const { error } = await supabase.from("characters").insert(dataObject);

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

  return { success: true, message: "", data: characters };
}

export async function deleteCharacter(charId: string, oldImage: string) {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (!auth || authError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน" };
  }

  const { error: deleteError } = await supabase.storage
    .from("character_image")
    .remove([`private/${oldImage}`]);

  if (deleteError) {
    return { success: false, message: "แก้ไขรูปภาพไม่สำเร็จ" };
  }

  const { error } = await supabase.from("characters").delete().eq("id", charId);

  if (error) {
    return { success: false, message: "ลบตัวละครไม่สำเร็จ" };
  }

  revalidatePath("/characters");
  return { success: true, message: "ลบตัวละครสำเร็จ" };
}

export async function updateCharImage(formData: FormData) {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (!auth || authError) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน" };
  }

  const file = formData.get("image") as File;
  const oldImage = formData.get("oldImage") as string;
  const charId = formData.get("charId") as string;

  const { error: deleteError } = await supabase.storage
    .from("character_image")
    .remove([`private/${oldImage}`]);

  if (deleteError) {
    return { success: false, message: "แก้ไขรูปภาพไม่สำเร็จ" };
  }

  const { error: imageError } = await supabase.storage
    .from("character_image")
    .upload(`/private/${file.name}`, file);

  if (imageError) {
    return { success: false, message: "แก้ไขรูปภาพไม่สำเร็จ" };
  }

  const { error } = await supabase
    .from("characters")
    .update({ image: file.name })
    .eq("id", charId);

  if (error) {
    return { success: false, message: "แก้ไขชื่อไฟล์ไม่สำเร็จ" };
  }

  revalidatePath("/characters");
  return { success: true, message: "แก้ไขรูปภาพสำเร็จ" };
}
