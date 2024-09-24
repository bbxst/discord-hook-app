"use client";

import { useRouter } from "next/navigation";
import { House, List, ListPlus, LogOut, PersonStanding } from "lucide-react";

import { createClient } from "@/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
      <DropdownMenuTrigger asChild>
        <div className="flex items-end p-2 gap-2 rounded-lg hover:bg-accent">
          <Avatar>
            <AvatarImage src={avatar} alt="avatar" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-3">
            <span className="font-medium">{displayName}</span>
            <span className="text-sm font-light text-muted-foreground">
              @{fullName}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="md:hidden"
          onClick={() => {
            router.push("/");
          }}
        >
          <House className="w-4 h-4 mr-2" />
          หน้าแรก
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="md:hidden">
          <List className="w-4 h-4 mr-2" />
          ปาร์ตี้ของฉัน
        </DropdownMenuItem> */}
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
