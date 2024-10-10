import { getAllMembers } from "@/actions/party-member.action";
import { getPartyById } from "@/actions/party.action";
import MemberCard from "@/components/member-card";
import isUUID from "@/lib/is-uuid";
import { notFound } from "next/navigation";

export default async function PartyPublicPage({
  params,
}: {
  params: { partyId: string };
}) {
  const isUuid = isUUID(params.partyId);

  if (!isUuid) {
    notFound();
  }

  const { data: party } = await getPartyById(params.partyId);
  const { data: members } = await getAllMembers(params.partyId);

  return (
    <main className="flex flex-col md:flex-row p-6 gap-6">
      <div className="flex-1 p-6 space-y-6 border rounded-lg bg-card">
        <h1 className="text-2xl font-semibold">ข้อมูลปาร์ตี้</h1>
        <h2 className="text-xl">ชื่อปาร์ตี้: {party?.name}</h2>
        <h2 className="text-xl">รายละเอียด: {party?.description}</h2>
        <h2 className="text-xl">Nest: {party?.nest}</h2>
        <h2 className="text-xl">ขนาด: {party?.size} คน</h2>
        <h2 className="text-xl">วัน: {party?.day}</h2>
        <h2 className="text-xl">
          เวลา: {party?.time.slice(0, 5).replace(":", ".")}
        </h2>
      </div>
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-semibold">สามาชิกปาร์ตี้</h1>
        {members.map((member) => (
          <MemberCard
            ids={{ characterId: member.characters?.id as string }}
            key={member.id}
            image={member.characters?.image as string}
            job={member.characters?.job as string}
            name={member.characters?.name as string}
          />
        ))}
      </div>
    </main>
  );
}
