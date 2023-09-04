import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <Link href="/todo">
        <Button>ToDo</Button>
      </Link>
      <Link href="/table">
        <Button>Table</Button>
      </Link>
    </>
  );
}
