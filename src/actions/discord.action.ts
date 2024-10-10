"use server";

import nestIcons from "@/lib/nest-icons";
import { Tables } from "@/supabase/database.types";
import { createClient } from "@/supabase/server";

export async function newJobNotify(name: string, job: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return { success: false, message: "ไม่พบบัญชีผู้ใช้งาน", messageId: "" };
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

  const req = await fetch(`${webhook_url}?wait=true`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const messageId = await req.json();

  if (req.ok) {
    return {
      success: true,
      message: "แจ้งเตือน Discord สำเร็จ",
      messageId: messageId.id,
    };
  } else {
    return {
      success: false,
      message: "แจ้งเตือน Discord ไม่สำเร็จ",
      messageId: "",
    };
  }
}

export async function notifyNewParty(data: Tables<"parties">) {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return { success: false };
  }

  const { data: members, error: membersError } = await supabase
    .from("party_members")
    .select("characters( name, profiles( provider_id ) )")
    .eq("party_id", data.id);

  if (membersError) {
    return { success: false };
  }

  const membersProfile = members?.map((member) => member.characters);

  const discordProfile = user.user_metadata;

  const webhook_url = process.env.WEBHOOK_URL as string;

  const thumbnailUrl = nestIcons(data.nest);

  const body = {
    embeds: [
      {
        title: data.name,
        description: data.description,
        url: `https://heidiguild.vercel.app/${data.id}`,
        author: {
          name: discordProfile?.custom_claims.global_name,
          icon_url: discordProfile?.avatar_url,
        },
        fields: [
          {
            name: "Nest",
            value: data.nest,
          },
          {
            name: "Day",
            value: data.day,
            inline: true,
          },
          {
            name: "Time",
            value: data.time.slice(0, 5).replace(":", "."),
            inline: true,
          },
        ],
        timestamp: new Date(),
        thumbnail: {
          url: thumbnailUrl,
        },
      },
      {
        title: "Party Members",
        color: null,
        fields: membersProfile?.map((member) => ({
          name: member?.name,
          value: `<@${member?.profiles?.provider_id}>`,
        })),
      },
    ],
  };

  const req = await fetch(`${webhook_url}?wait=true`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const message = await req.json();

  const { error: updateError } = await supabase
    .from("parties")
    .update({ message_id: message.id })
    .eq("id", data.id);

  if (updateError) {
    console.log(updateError);

    return { success: false };
  }

  return { success: true };
}

export async function deleteNotifyMessage(messageId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return { success: false };
  }

  const webhook_url = process.env.WEBHOOK_URL as string;

  const req = await fetch(`${webhook_url}/messages/${messageId}`, {
    method: "delete",
  });

  if (req.ok) {
    return { success: true };
  }
  return { success: false };
}
