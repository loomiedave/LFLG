"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Club } from "@/types/admin";
import Loading from "@/components/ui/Loading";

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clubs")
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Clubs</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <Link
            key={club.id}
            href={`/clubs/${club.id}/players`}
            className="block bg-muted border border-border rounded-lg p-6 hover:bg-secondary transition-colors"
          >
            <h3 className="text-xl font-semibold">{club.name}</h3>
            <p className="text-muted-foreground mt-2">
              {club._count.licenses} Players
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
