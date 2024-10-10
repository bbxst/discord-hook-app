"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { jobsList } from "@/lib/dn-classes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export default function JobSearchBar() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (job: string) => {
    const params = new URLSearchParams(searchParams);

    if (job) {
      params.set("job", job);
    } else {
      params.delete("job");
    }

    router.replace(`${pathName}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">ตัวละครทั้งหมด</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            <span className="sm:hidden md:block">
              {searchParams.get("job")
                ? searchParams.get("job")
                : "ค้นหาตามอาชีพ"}
            </span>
            <ChevronsUpDown className="ml-2 sm:ml-0 md:ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="ค้นหาอาชีพ..." />
            <CommandList>
              <CommandEmpty>ไม่พบชื่ออาชีพที่ค้นหา</CommandEmpty>
              <CommandGroup>
                <CommandItem value="" onSelect={handleSelect}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      searchParams.get("job") ? "opacity-0" : "opacity-100"
                    )}
                  />
                  ตัวละครทั้งหมด
                </CommandItem>
                {jobsList.map((job) => (
                  <CommandItem key={job} value={job} onSelect={handleSelect}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        searchParams.get("job") === job
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {job}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
