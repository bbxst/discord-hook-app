import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export default function PartyCard() {
  const date = new Date("2024-08-24T22:00:00.000");

  return (
    <Card className="shrink-0">
      <CardHeader>
        <CardTitle>Sea Dragon Nest</CardTitle>
        <CardDescription>{date.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-evenly">
        <div>
          <p>ขนาด</p>
          <h2 className="text-5xl">8</h2>
        </div>
        <div>
          <p>ว่าง</p>
          <h2 className="text-5xl">8</h2>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">ลงชื่อ</Button>
      </CardFooter>
    </Card>
  );
}
