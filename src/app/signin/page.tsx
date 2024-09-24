import { ArrowUp } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <main className="relative flex flex-col justify-between items-center">
      <ArrowUp className="absolute top-0 right-10 w-20 h-20" />
      <div className="flex-1 flex flex-col justify-center text-center px-6 gap-6">
        <h1 className="text-3xl md:text-5xl font-bold">
          กรุณาเข้าสู่ระบบเพื่อใช้งาน
        </h1>
        <p className="md:text-xl">
          ไม่งั้นคุณอาเรียจะโกรธแล้วนะ หรือว่าอยากดูคุณอาเรียโกรธ ?
        </p>
      </div>
      <Image
        className="flex-1 w-[400px] h-[400px] object-cover"
        src="/anime-alya-render.gif"
        alt="gif"
        width={400}
        height={400}
      />
    </main>
  );
}
