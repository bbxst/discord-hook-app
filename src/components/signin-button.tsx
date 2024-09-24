"use client";

import { createClient } from "@/supabase/client";

import { Button } from "./ui/button";
import Image from "next/image";

export default function SigninButton() {
  const supabase = createClient();

  return (
    <Button
      className="bg-[#5865F2] hover:bg-[#5865F2]/80"
      onClick={async () =>
        await supabase.auth.signInWithOAuth({
          provider: "discord",
          options: {
            redirectTo: "https://heidiguild.vercel.app/auth/callback",
          },
        })
      }
    >
      <Image
        className="mr-2"
        src="/discord-mark.png"
        alt="discord logo"
        width={16}
        height={16}
      />
      เข้าสู่ระบบ
    </Button>
  );
}
