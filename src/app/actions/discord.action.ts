"use server";

import { createClient } from "@/supabase/server";

export async function newJobNotify(name: string, job: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน" };
  }

  const discordProfile = data.user?.user_metadata;

  const webhook_url = process.env.WEBHOOK_URL as string;

  const body = {
    content: `เพิ่มตัวละครใหม่ลงในระบบ`,
    embeds: [
      {
        title: name,
        description: `${job}`,

        author: {
          name: discordProfile?.custom_claims.global_name,
          icon_url: discordProfile?.avatar_url,
        },
        timestamp: new Date(),
        thumbnail: {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7biQOPEGEjgXLxhp1M79tSujfSPuorMXBJw&s",
        },
      },
    ],
  };

  const rq = await fetch(webhook_url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (rq.ok) {
    return { success: true, message: "แจ้งเตือน Discord สำเร็จ" };
  } else {
    return { success: false, message: "แจ้งเตือน Discord ไม่สำเร็จ" };
  }
}
