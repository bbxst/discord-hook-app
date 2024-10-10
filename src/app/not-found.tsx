import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Image
        className="mb-4"
        src="/anime-alya-render.gif"
        alt="test"
        width={400}
        height={0}
      />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        Oops! The page you&lsquo;re looking for doesn&lsquo;t exist.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}
