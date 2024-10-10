"use client";

import Image from "next/image";

import { Tables } from "@/supabase/database.types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { notifyNewParty } from "@/actions/discord.action";
import { useToast } from "@/hooks/use-toast";

export default function NotifyMember({ data }: { data: Tables<"parties"> }) {
  const { toast } = useToast();

  const handleAction = async () => {
    const { success } = await notifyNewParty(data);

    toast({
      title: "แจ้งเตือน",
      description: success ? "สำเร็จ" : "ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      variant: success ? "default" : "destructive",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Image
            src="/discord-mark.png"
            alt="discord logo"
            width={22}
            height={22}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>แจ้งเตือนไปยัง Discord</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>ยืนยัน</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
