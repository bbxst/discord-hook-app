import Image from "next/image";

import { createClient } from "@/supabase/server";

import SigninButton from "./signin-button";
import ThemeToggle from "./theme-toggle";
import UserMenu from "./user-menu";
import Link from "next/link";

export default async function Header() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  console.log(user?.user_metadata);

  return (
    <header className="bg-card">
      <nav className="flex justify-between items-center h-24 px-6">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-lg"
            src="/logo.jpg"
            alt="logo"
            width={50}
            height={50}
          />
          <div className="hidden md:flex gap-3">
            <Link href="/" className="hover:text-muted-foreground">
              หน้าแรก
            </Link>
            {/* <Link href="/parties" className="hover:text-muted-foreground">
              ปาร์ตี้ของฉัน
            </Link> */}
            <Link href="/characters" className="hover:text-muted-foreground">
              ตัวละครของฉัน
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <UserMenu
              avatar={user.user_metadata.avatar_url}
              displayName={user.user_metadata.custom_claims.global_name}
              fullName={user.user_metadata.full_name}
            />
          ) : (
            <SigninButton />
          )}
        </div>
      </nav>
    </header>
  );
}
