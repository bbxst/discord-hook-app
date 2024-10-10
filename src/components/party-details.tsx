"use client";

import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

import { Tables } from "@/supabase/database.types";
import { useToast } from "@/hooks/use-toast";

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
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { updateParty } from "@/actions/party.action";

export default function PartyDetails({
  data,
  setOpen,
}: {
  data: Tables<"parties">;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const [disable, setDisable] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    formData.append("id", data.id);

    const { success, message } = await updateParty(formData);

    toast({
      title: "แจ้งเตือน",
      description: message,
      variant: success ? "default" : "destructive",
    });

    setPending(false);
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
      <div className="space-y-2">
        <Label htmlFor="name">ชื่อปาร์ตี้</Label>
        <Input
          id="name"
          name="name"
          disabled={disable}
          defaultValue={data.name}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">รายละเอียด</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={data.description}
          disabled={disable}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nest">Nest / Dungeon</Label>
        <Select
          name="nest"
          disabled={disable}
          defaultValue={data.nest}
          required
        >
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
        <Select
          required
          name="size"
          disabled={disable}
          defaultValue={data.size.toString()}
        >
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
          <Select
            name="day"
            disabled={disable}
            defaultValue={data.day}
            required
          >
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
          <Input
            id="time"
            name="time"
            type="time"
            disabled={disable}
            defaultValue={data.time}
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-6">
        <Button
          type="button"
          variant="secondary"
          onClick={(event) => {
            event.preventDefault();
            formRef.current?.reset();

            setDisable(true);
          }}
          className={`${disable ? "hidden" : "inline-flex"} w-full`}
        >
          ยกเลิก
        </Button>
        <Button
          type="submit"
          disabled={pending}
          className={`${disable ? "hidden" : "inline-flex"} w-full`}
        >
          <Loader2
            className={`${
              pending ? "block" : "hidden"
            } w-4 h-4 mr-2 animate-spin`}
          />
          บันทึก
        </Button>
        <Button
          type="button"
          onClick={() => setDisable(false)}
          className={`${disable ? "inline-flex" : "hidden"} w-full`}
        >
          แก้ไข
        </Button>
      </div>
    </form>
  );
}
