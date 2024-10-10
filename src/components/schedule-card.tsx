import nestIcons from "@/lib/nest-icons";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ScheduleCardProps = {
  id: string;
  nest: string;
  name: string;
  time: string;
};

export default function ScheduleCard(props: ScheduleCardProps) {
  const icon = nestIcons(props.nest);

  const time = props.time.slice(0, 5).replace(":", ".");

  return (
    <div className="flex flex-col p-3 gap-3 border rounded-lg bg-card">
      <Image
        className="rounded-lg"
        src={icon}
        alt="Nest Logo"
        width={100}
        height={100}
      />
      <div>
        <Link
          href={`/${props.id}`}
          className="text-lg font-medium hover:underline"
        >
          {props.name}
        </Link>
        <p className="flex items-center gap-1 text-sm">
          <Clock className="w-4 h-4" />
          {time}
        </p>
      </div>
    </div>
  );
}
