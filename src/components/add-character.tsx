"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRoundPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { jobsList } from "@/lib/dn-classes";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { newJobNotify } from "@/app/actions/discord.action";
import { addCharacter } from "@/app/actions/character.action";

const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "ขั้นต่ำ 4 ตัวอักษร" })
    .max(10, { message: "สูงสุด 10 ตัวอักษร" }),
  job: z
    .string()
    .min(4, { message: "ขั้นต่ำ 4 ตัวอักษร" })
    .max(20, { message: "สูงสุด 20 ตัวอักษร" }),
});

export default function AddCharacter() {
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      job: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { success, message } = await addCharacter(values.name, values.job);

    await newJobNotify(values.name, values.job);

    toast({
      title: message,
      variant: success ? "default" : "destructive",
    });

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserRoundPlus className="w-5 h-5 mr-2" />
          เพิ่มตัวละคร
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เพิ่มตัวละคร</DialogTitle>
          <DialogDescription>
            เพิ่มตัวละครสำหรับใช้ในการจัดปาร์ตี้
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อตัวละคร</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อาชีพ</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobsList.map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">บันทึก</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
