import { Suspense } from "react";
import { List } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import MyPartyCard from "@/components/my-party-card";

import CreateParty from "@/components/create-party";
import { getMyParties } from "../../actions/party.action";

function PartiesSkeletion() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-6 pb-6 gap-6">
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="xl:hidden w-full h-36" />
    </div>
  );
}

async function PartiesContainer() {
  const { success, data } = await getMyParties();

  if (!success) {
    return <p>ไม่พบปาร์ตี้ของคุณ</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 pb-6 gap-6">
      {data.map((party) => (
        <MyPartyCard key={party.id} data={party} />
      ))}
    </div>
  );
}

export default function MyPartiesPage() {
  return (
    <main>
      <div className="flex justify-between items-center p-6">
        <h1 className="inline-flex items-center text-2xl font-bold">
          <List className="w-7 h-7 mr-2" />
          ปาร์ตี้ของฉัน
        </h1>
        <CreateParty />
      </div>
      <Suspense fallback={<PartiesSkeletion />}>
        <PartiesContainer />
      </Suspense>
    </main>
  );
}
