import PartyCard from "@/components/party-card";
import { List } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="flex justify-between items-center p-6">
        <h1 className="inline-flex items-center text-2xl font-bold">
          <List className="w-7 h-7 mr-2" />
          ปาร์ตี้ทั้งหมด (ตัวอย่าง)
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 gap-6">
        <PartyCard />
      </div>
    </main>
  );
}
