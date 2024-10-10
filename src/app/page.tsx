import { Suspense } from "react";
import { List } from "lucide-react";

import ScheduleCard from "@/components/schedule-card";

import { getMySchedule } from "../actions/party-member.action";
import { Skeleton } from "@/components/ui/skeleton";

function LoaderSkeleton() {
  return (
    <div className="px-6 pb-6 space-y-6">
      <div className="flex gap-6 overflow-x-auto">
        <Skeleton className="shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden sm:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden md:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden lg:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden lg:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden xl:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden xl:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden xl:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden xl:block shrink-0 w-[125px] h-[160px]" />
        <Skeleton className="hidden xl:block shrink-0 w-[125px] h-[160px]" />
      </div>
    </div>
  );
}

async function PartyLoader() {
  const { data, error } = await getMySchedule();

  if (error) {
    return <p>{error}</p>;
  }

  if (data) {
    const sunday = data.filter((party) => party?.day == "sunday");
    const monday = data.filter((party) => party?.day == "monday");
    const tuesday = data.filter((party) => party?.day == "tuesday");
    const wednesday = data.filter((party) => party?.day == "wednesday");
    const thursday = data.filter((party) => party?.day == "thursday");
    const friday = data.filter((party) => party?.day == "friday");
    const saturday = data.filter((party) => party?.day == "saturday");

    return (
      <div className="px-6 pb-6">
        <h2 className="text-xl font-medium">วันอาทิตย์</h2>
        <div className="flex py-6 gap-6 overflow-x-auto">
          {sunday.map((party) => (
            <ScheduleCard
              id={party?.id as string}
              key={party?.id}
              nest={party?.nest as string}
              name={party?.name as string}
              time={party?.time as string}
            />
          ))}
        </div>

        <h2 className="text-xl font-medium">วันจันทร์</h2>
        <div className="flex py-6 gap-6 overflow-x-auto">
          {monday.map((party) => (
            <ScheduleCard
              id={party?.id as string}
              key={party?.id}
              nest={party?.nest as string}
              name={party?.name as string}
              time={party?.time as string}
            />
          ))}
        </div>

        <h2 className="text-xl font-medium">วันอังคาร</h2>
        <div className="flex py-6 gap-6 overflow-x-auto">
          {tuesday.map((party) => (
            <ScheduleCard
              id={party?.id as string}
              key={party?.id}
              nest={party?.nest as string}
              name={party?.name as string}
              time={party?.time as string}
            />
          ))}
        </div>

        <h2 className="text-xl font-medium">วันพุธ</h2>
        <div className="flex py-6 gap-6 overflow-x-auto">
          {wednesday.map((party) => (
            <ScheduleCard
              id={party?.id as string}
              key={party?.id}
              nest={party?.nest as string}
              name={party?.name as string}
              time={party?.time as string}
            />
          ))}
        </div>

        <h2 className="text-xl font-medium">วันพฤหัสบดี</h2>
        <div className="flex py-6 gap-6 overflow-x-auto">
          {thursday.map((party) => (
            <ScheduleCard
              id={party?.id as string}
              key={party?.id}
              nest={party?.nest as string}
              name={party?.name as string}
              time={party?.time as string}
            />
          ))}
        </div>

        <h2 className="text-xl font-medium">วันศุกร์</h2>
        <div className="flex py-6 gap-6 overflow-x-auto">
          {friday.map((party) => (
            <ScheduleCard
              id={party?.id as string}
              key={party?.id}
              nest={party?.nest as string}
              name={party?.name as string}
              time={party?.time as string}
            />
          ))}
        </div>

        <h2 className="text-xl font-medium">วันเสาร์</h2>
        <div className="flex py-6 gap-6 overflow-x-auto">
          {saturday.map((party) => (
            <ScheduleCard
              id={party?.id as string}
              key={party?.id}
              nest={party?.nest as string}
              name={party?.name as string}
              time={party?.time as string}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default function Home() {
  return (
    <main>
      <div className="flex justify-between items-center p-6">
        <h1 className="inline-flex items-center text-2xl font-bold">
          <List className="w-7 h-7 mr-2" />
          ตารางลง Nest
        </h1>
      </div>
      <Suspense fallback={<LoaderSkeleton />}>
        <PartyLoader />
      </Suspense>
    </main>
  );
}
