import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Link href="/userDashboard">Dashboard</Link>
      <Link href="/adminDashboard">Admin Dashboard</Link>
    </div>
  );
}
