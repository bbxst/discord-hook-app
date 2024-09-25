"use client";

import { Clock, Loader2, UserRoundCog, X } from "lucide-react";

import { Tables } from "@/supabase/database.types";
import {
  deleteCharacter,
  updateCharImage,
} from "@/app/actions/character.action";
import { useToast } from "@/hooks/use-toast";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { jobsEmoji } from "@/lib/dn-classes";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { deleteNotifyMessage } from "@/app/actions/discord.action";
import { FormEvent, useState } from "react";

export default function CharacterCard({
  id,
  name,
  job,
  image,
  message_id,
  created_at,
}: Tables<"characters">) {
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  const date = new Date(created_at);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const icon = jobsEmoji(job);

  const handleDelete = async () => {
    const { success, message } = await deleteCharacter(id, image);

    if (success) {
      const { success } = await deleteNotifyMessage(message_id);

      if (success) {
        toast({
          title: message,
        });
      }
    } else {
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    formData.append("oldImage", image);
    formData.append("charId", id);

    const { success, message } = await updateCharImage(formData);

    toast({
      title: message,
      variant: success ? "default" : "destructive",
    });

    setPending(false);
    setOpen(false);
  };

  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <UserRoundCog className="w-5 h-5" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เปลี่ยนรูปภาพ</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <Input type="file" name="image" />

              <Button disabled={pending} className="w-full" type="submit">
                <Loader2
                  className={`${
                    pending ? "block" : "hidden"
                  } w-4 h-4 mr-2 animate-spin`}
                />
                ยืนยัน
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger>
            <X />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ต้องการที่จะลบตัวละครใช่หรือไม่ ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                หากลบไปแล้วไม่สามารถนำกลับมาได้ต้องเพิ่มใหม่เท่านั้น
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              <AlertDialogAction disabled={pending} onClick={handleDelete}>
                <Loader2
                  className={`${
                    pending ? "block" : "hidden"
                  } w-4 h-4 mr-2 animate-spin`}
                />
                ยืนยัน
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CardHeader className="flex-row gap-2">
        <div>
          <Image src={icon as string} alt="job icon" width={50} height={50} />
        </div>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{job}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div>
          <Image
            priority
            className="w-full h-full object-cover"
            src={`${storageUrl}/${image}`}
            alt="stats image"
            width={300}
            height={0}
          />
        </div>
      </CardContent>

      <CardFooter>
        <p className="flex items-center text-xs text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          {formattedDate}
        </p>
      </CardFooter>
    </Card>
  );
}
