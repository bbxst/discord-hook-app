"use client";

import { useRouter } from "next/navigation";
import { House, List, LogOut, PersonStanding } from "lucide-react";

import { createClient } from "@/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserMenuProps = {
  avatar: string;
  displayName: string;
  fullName: string;
};

export default function UserMenu({
  avatar,
  displayName,
  fullName,
}: UserMenuProps) {
  const router = useRouter();

  const supabase = createClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatar} alt="avatar" />
          <AvatarFallback>DN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span>{displayName}</span>
          <span className="text-xs font-normal">@{fullName}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="md:hidden"
          onClick={() => {
            router.push("/");
          }}
        >
          <House className="w-4 h-4 mr-2" />
          หน้าแรก
        </DropdownMenuItem>
        <DropdownMenuItem
          className="md:hidden"
          onClick={() => {
            router.push("/myparties");
          }}
        >
          <List className="w-4 h-4 mr-2" />
          ปาร์ตี้ของฉัน
        </DropdownMenuItem>
        <DropdownMenuItem
          className="md:hidden"
          onClick={() => {
            router.push("/characters");
          }}
        >
          <PersonStanding className="w-4 h-4 mr-2" />
          ตัวละครของฉัน
        </DropdownMenuItem>
        <DropdownMenuSeparator className="md:hidden" />
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut();

            router.refresh();
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          ออกจากระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
