"use client";

import Image from "next/image";

import { useToast } from "@/hooks/use-toast";
import { jobsEmoji } from "@/lib/dn-classes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { addToParty, kickFromParty } from "@/actions/party-member.action";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

type MemberCardProps = {
  job: string;
  name: string;
  image: string;
  ids: {
    partyId?: string;
    memberId?: string;
    userId?: string;
    characterId: string;
  };
};

export default function MemberCard(props: MemberCardProps) {
  const { toast } = useToast();

  const icon = jobsEmoji(props.job);

  const handleClick = async () => {
    if (props.ids.memberId) {
      const { error } = await kickFromParty(props.ids.characterId);

      if (error) {
        toast({
          title: "แจ้งเตือน",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({ title: "แจ้งเตือน", description: `เตะ ${props.name} สำเร็จ` });
      }
    } else if (props.ids.partyId && props.ids.userId) {
      const { error } = await addToParty(
        props.ids.partyId,
        props.ids.characterId,
        props.ids.userId
      );

      if (error) {
        toast({
          title: "แจ้งเตือน",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "แจ้งเตือน",
          description: `เพิ่ม ${props.name} เข้าปาร์ตี้`,
        });
      }
    }
  };

  return (
    <div className="flex justify-between items-center p-6 border rounded-lg bg-card">
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
      {props.ids.memberId || props.ids.partyId || props.ids.userId ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              {props.ids.memberId ? "เตะจากปาร์ตี้" : "เพิ่มเข้าปาร์ตี้"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {props.ids.memberId
                  ? `ต้องการที่จะเตะ ${props.name} ออกจากปาร์ตี้ใช่ หรือไม่ ?`
                  : `ต้องการที่จะเพิ่ม ${props.name} เข้าปาร์ตี้ใช่ หรือไม่ ?`}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClick}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <div></div>
      )}
    </div>
  );
}
