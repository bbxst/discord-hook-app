import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import Image from "next/image";
import { jobsEmoji } from "@/lib/dn-classes";
import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

type CharacterProps = {
  name: string;
  job: string;
  image: string;
  className?: ClassValue;
};

export default function CharacterSelect(props: CharacterProps) {
  const icon = jobsEmoji(props.job);

  return (
    <div
      className={cn(
        props.className,
        "flex justify-between items-center p-6 border rounded-lg bg-card"
      )}
    >
      <div className="flex gap-2">
        <Image src={icon as string} alt="job icon" width={50} height={50} />
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h1 className="text-2xl font-bold hover:underline hover:underline-offset-4">
                  {props.name}
                </h1>
              </TooltipTrigger>
              <TooltipContent>
                <Image
                  src={`${storageUrl}/${props.image}`}
                  alt="stats"
                  width={250}
                  height={0}
                />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p>{props.job}</p>
        </div>
      </div>
      <Button>เพิ่มเข้าปาร์ตี้</Button>
    </div>
  );
}
