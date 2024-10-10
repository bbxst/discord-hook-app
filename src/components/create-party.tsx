"use client";

import { FormEvent, useState } from "react";
import { ListPlus, Loader2 } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { createParty } from "@/actions/party.action";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CreateParty() {
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);

    const { success, message } = await createParty(formData);

    toast({
      title: "แจ้งเตือน",
      description: message,
      variant: success ? "default" : "destructive",
    });

    setOpen(false);
    setPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ListPlus className="w-5 h-5 mr-2" />
          สร้างปาร์ตี้
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>สร้างปาร์ตี้</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อปาร์ตี้</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">รายละเอียด</Label>
            <Textarea id="description" name="description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nest">Nest / Dungeon</Label>
            <Select name="nest" required>
              <SelectTrigger id="nest">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cerberus">Cerberus Nest</SelectItem>
                <SelectItem value="manticore">Manticore Nest</SelectItem>
                <SelectItem value="apocalypse">Apocalypse Nest</SelectItem>
                <SelectItem value="seadragon">Sea Dragon Nest</SelectItem>
                <SelectItem value="archbishop">Archbishop Nest</SelectItem>
                <SelectItem value="gigantes">Gigantes Nest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">ขนาดปาร์ตี้</Label>
            <Select name="size" required>
              <SelectTrigger id="size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="day">วัน</Label>
              <Select name="day" required>
                <SelectTrigger id="day">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">วันอาทิตย์</SelectItem>
                  <SelectItem value="monday">วันจันทร์</SelectItem>
                  <SelectItem value="tuesday">วันอังคาร</SelectItem>
                  <SelectItem value="wednesday">วันพุธ</SelectItem>
                  <SelectItem value="thursday">วันพฤหัสบดี</SelectItem>
                  <SelectItem value="friday">วันศุกร์</SelectItem>
                  <SelectItem value="saturday">วันเสาร์</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="time">เวลา</Label>
              <Input id="time" name="time" type="time" required />
            </div>
          </div>
          <Button type="submit" disabled={pending} className="w-full">
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
  );
}
