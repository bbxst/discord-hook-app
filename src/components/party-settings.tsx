"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import PartyDetails from "./party-details";
import { Tables } from "@/supabase/database.types";

export default function PartySettings({ data }: { data: Tables<"parties"> }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลปาร์ตี้</DialogTitle>
        </DialogHeader>
        <PartyDetails data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
