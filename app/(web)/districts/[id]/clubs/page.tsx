"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DistrictWithClubs } from "@/types/type";

export default function ClubsPage() {
  const params = useParams();
  const [district, setDistrict] = useState<DistrictWithClubs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    fetch(`/api/districts/${params.id}/clubs`)
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Frontend received:", data);

        // Check if response contains error
        if (data.error) {
          setError(data.error);
          setDistrict(null);
        } else {
          setDistrict(data);
          setError(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch district data");
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error: {error}</div>;
  if (!district) return <div className="p-8">District not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/districts" className="hover:text-primary">
          Districts
        </Link>
        <span> / </span>
        <span>{district.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Clubs in {district.name}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {district.clubs.map((club) => (
          <Link
            key={club.id}
            href={`/clubs/${club.id}/players`}
            className="block bg-muted border border-border rounded-lg p-6 hover:bg-secondary transition-colors"
          >
            <h3 className="text-xl font-semibold">{club.name}</h3>
            <p className="text-muted-foreground mt-2">
              {club._count.licenses} players
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
