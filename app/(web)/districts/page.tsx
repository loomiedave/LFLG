"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Districts } from "@/types/type";

export default function DistrictsPage() {
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/districts")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 mt-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-8">Districts</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {districts.map((district) => (
          <Link
            key={district.id}
            href={`/districts/${district.id}/clubs`}
            className="block bg-muted border border-border rounded-lg p-6 hover:bg-secondary transition-colors"
          >
            <h3 className="text-xl font-semibold">{district.name}</h3>
            <p className="text-muted-foreground mt-2">
              {district._count.clubs} clubs
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
