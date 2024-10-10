import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";

import { getAllCharacters, getAllMembers } from "@/actions/party-member.action";
import { Skeleton } from "@/components/ui/skeleton";
import { getPartyById } from "@/actions/party.action";

import MemberCard from "@/components/member-card";
import JobSearchBar from "@/components/job-search-bar";
import PartySettings from "@/components/party-settings";
import NotifyMember from "@/components/notify-member";
import isUUID from "@/lib/is-uuid";
import { notFound } from "next/navigation";

function MemberSkeletion() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-28" />
      <Skeleton className="w-full h-28" />
      <Skeleton className="w-full h-28" />
      <Skeleton className="w-full h-28" />
    </div>
  );
}

async function DetailsLoader({ partyId }: { partyId: string }) {
  const { data } = await getPartyById(partyId);

  if (data) {
    return (
      <div className="inline-flex gap-1">
        <NotifyMember data={data} />
        <PartySettings data={data} />
      </div>
    );
  }
}

async function CharactersLoader({
  partyId,
  job,
}: {
  partyId: string;
  job?: string;
}) {
  const { data, error } = await getAllCharacters(partyId, job);

  if (error) {
    return <p className="p-6 text-center text-muted-foreground">{error}</p>;
  }

  if (!data.length) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        ไม่พบตัวละครที่ยังไม่มีปาร์ตี้
      </p>
    );
  }

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      {data.map((character) => (
        <MemberCard
          key={character.id}
          name={character.name}
          job={character.job}
          image={character.image}
          ids={{
            partyId: partyId,
            characterId: character.id,
            userId: character.profiles?.user_id,
          }}
        />
      ))}
    </div>
  );
}

async function MembersLoader({ partyId }: { partyId: string }) {
  const { error, data } = await getAllMembers(partyId);

  if (error) {
    return <p className="p-6 text-center text-muted-foreground">{error}</p>;
  }

  if (!data.length) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        ยังไม่มีสมาชิกปาร์ตี้
      </p>
    );
  }

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      {data.map((member) => (
        <MemberCard
          key={member.id}
          job={member.characters?.job as string}
          name={member.characters?.name as string}
          image={member.characters?.image as string}
          ids={{
            memberId: member.id,
            characterId: member.characters?.id as string,
          }}
        />
      ))}
    </div>
  );
}

export default function PartyPage({
  params,
  searchParams,
}: {
  params: { partyId: string };
  searchParams?: { job?: string };
}) {
  const isUuid = isUUID(params.partyId);

  if (!isUuid) {
    notFound();
  }

  return (
    <main className="flex flex-col sm:flex-row">
      <div className="w-full md:w-1/2 flex flex-col p-6 gap-6 sm:border-r">
        <div className="flex justify-between items-center">
          <Link href="/myparties">
            <ChevronLeft />
          </Link>
          <h1 className="text-2xl font-bold">สามาชิกปาร์ตี้</h1>

          <DetailsLoader partyId={params.partyId} />
        </div>
        <Suspense fallback={<MemberSkeletion />}>
          <MembersLoader partyId={params.partyId} />
        </Suspense>
      </div>
      <div className="w-full md:w-1/2 flex flex-col p-6 gap-6 sm:border-l">
        <JobSearchBar />
        <Suspense key={searchParams?.job} fallback={<MemberSkeletion />}>
          <CharactersLoader partyId={params.partyId} job={searchParams?.job} />
        </Suspense>
      </div>
    </main>
  );
}
