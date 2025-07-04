"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRoundPlus, Loader2 } from "lucide-react";
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
import { newJobNotify } from "@/actions/discord.action";
import { addCharacter } from "@/actions/character.action";

const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "ขั้นต่ำ 4 ตัวอักษร" })
    .max(10, { message: "สูงสุด 10 ตัวอักษร" }),
  job: z
    .string()
    .min(4, { message: "ขั้นต่ำ 4 ตัวอักษร" })
    .max(20, { message: "สูงสุด 20 ตัวอักษร" }),
  image: z
    .instanceof(File)
    .refine(
      (file) => {
        return file.size < 1 * 1024 * 1024;
      },
      { message: "ขนาดไฟล์ห้ามเกิน 1 MB" }
    )
    .refine((file) => {
      return ["image/jpeg", "image/png"].includes(file.type);
    }),
});

export default function AddCharacter() {
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      job: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setPending(true);

    const { messageId } = await newJobNotify(values.name, values.job);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("job", values.job);
    formData.append("image", values.image);
    formData.append("messageId", messageId);

    const { success, message } = await addCharacter(formData);

    toast({
      title: message,
      variant: success ? "default" : "destructive",
    });

    form.reset();
    setPending(false);
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เพิ่มรูป</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pending} className="w-full" type="submit">
              <Loader2
                className={`${
                  pending ? "block" : "hidden"
                } w-4 h-4 mr-2 animate-spin`}
              />
              บันทึก
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
