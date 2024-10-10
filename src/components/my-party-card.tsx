"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import nestIcons from "@/lib/nest-icons";
import { Tables } from "@/supabase/database.types";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { buttonVariants } from "./ui/button";
import { deleteParty } from "@/actions/party.action";
import { useToast } from "@/hooks/use-toast";

export default function MyPartyCard({ data }: { data: Tables<"parties"> }) {
  const { toast } = useToast();

  const iconUrl = nestIcons(data.nest);

  const handleClick = async () => {
    const { success, message } = await deleteParty(data.id);

    toast({
      title: "แจ้งเตือน",
      description: message,
      variant: success ? "default" : "destructive",
    });
  };

  return (
    <Card className="relative">
      <CardHeader className="flex-row gap-2">
        <div className="z-10">
          <Image
            className="rounded-lg"
            src={iconUrl}
            alt="job icon"
            width={50}
            height={50}
          />
        </div>
        <div className="z-10">
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>{data.nest}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Link
          href={`/myparties/${data.id}`}
          className={cn(buttonVariants({ variant: "default" }), "z-10 w-full")}
        >
          รายละเอียด
        </Link>
      </CardFooter>
      <AlertDialog>
        <AlertDialogTrigger className="absolute top-3 right-3">
          <X className="w-5 h-5" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ต้องการลบ {data.name} ใช่หรือไม่?
            </AlertDialogTitle>
            <AlertDialogDescription>
              หากลบไปแล้วไม่สามาถกู้คืนได้
              ข้อมูลจะถูกลบโดยถาวรตรวจสอบรายการก่อนลบทุกครั้ง
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>ยืนยัน</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="absolute right-0 bottom-0 z-0 w-[270px] opacity-20">
        <Image
          className="object-cover"
          src="/party.png"
          alt="party bg"
          width={270}
          height={0}
        />
      </div>
    </Card>
  );
}
