import { Suspense } from "react";
import { PersonStanding } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import AddCharacter from "@/components/add-character";
import CharacterCard from "@/components/character-card";
import { getCharacters } from "../actions/character.action";

function CardSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-6 gap-6">
      <Skeleton className="h-[100px]  rounded-lg" />
      <Skeleton className="lg:hidden xl:block h-[100px]  rounded-lg" />
      <Skeleton className="lg:hidden h-[100px]  rounded-lg" />
      <Skeleton className="lg:hidden h-[100px]  rounded-lg" />
      <Skeleton className="md:hidden h-[100px]  rounded-lg" />
      <Skeleton className="sm:hidden h-[100px]  rounded-lg" />
      <Skeleton className="hidden sm:block h-[100px]  rounded-lg" />
      <Skeleton className="hidden md:block h-[100px]  rounded-lg" />
      <Skeleton className="hidden md:block h-[100px]  rounded-lg" />
      <Skeleton className="hidden md:block h-[100px]  rounded-lg" />
    </div>
  );
}

async function CardContainer() {
  const { data } = await getCharacters();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 pb-6 gap-6">
      {data?.map((char) => (
        <CharacterCard
          key={char.id}
          id={char.id}
          name={char.name}
          job={char.job}
          user_id={char.user_id}
          image={char.image}
          message_id={char.message_id}
          created_at={char.created_at}
        />
      ))}
    </div>
  );
}

export default async function CharacterPage() {
  return (
    <main>
      <div className="flex justify-between items-center p-6">
        <h1 className="inline-flex items-center text-2xl font-bold">
          <PersonStanding className="w-7 h-7 mr-2" />
          ตัวละครของฉัน
        </h1>
        <AddCharacter />
      </div>
      <Suspense fallback={<CardSkeleton />}>
        <CardContainer />
      </Suspense>
    </main>
  );
}
