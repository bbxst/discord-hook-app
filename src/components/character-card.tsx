"use client";

import { X } from "lucide-react";

import { Tables } from "@/supabase/database.types";
import { deleteCharacter } from "@/app/actions/character.action";
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
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function CharacterCard({ id, name, job }: Tables<"characters">) {
  const { toast } = useToast();

  const handleDelete = async () => {
    const { success, message } = await deleteCharacter(id);

    toast({
      title: message,
      variant: success ? "default" : "destructive",
    });
  };

  return (
    <Card className="relative">
      <AlertDialog>
        <AlertDialogTrigger className="absolute top-4 right-4">
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
            <AlertDialogAction onClick={handleDelete}>ยืนยัน</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{job}</CardDescription>
      </CardHeader>
    </Card>
  );
}
