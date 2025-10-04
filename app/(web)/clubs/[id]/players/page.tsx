"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ClubWithLicenses } from "@/types/type";

export default function PlayersPage() {
  const params = useParams();
  const [club, setClub] = useState<ClubWithLicenses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) {
      setLoading(false);
      return;
    }

    fetch(`/api/clubs/${params.id}/players`)
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Frontend received:", data);

        if (data.error) {
          setError(data.error);
          setClub(null);
        } else {
          setClub(data);
          setError(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch club data");
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error: {error}</div>;
  if (!club) return <div className="p-8">Club not found</div>;

  const activePlayers = club.licenses.filter((p) => p.status === "ACTIVE");

  return (
    <div className="container mx-auto px-4 mt-12 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/districts" className="hover:text-primary">
          Districts
        </Link>
        <span> / </span>
        <Link
          href={`/districts/${club.district.id}/clubs`}
          className="hover:text-primary"
        >
          {club.district.name}
        </Link>
        <span> / </span>
        <span>{club.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
      <p className="text-muted-foreground mb-8">
        {club.licenses.length} total players • {activePlayers.length} active
      </p>

      <div className="bg-muted border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                License
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {club.licenses.map((player) => (
              <tr key={player.id} className="hover:bg-secondary/50">
                <td className="px-6 py-4">
                  <div className="font-medium">
                    {player.name} {player.surname}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {player.address}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{player.licenseNumber}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      player.status === "ACTIVE"
                        ? "bg-success/10 text-success"
                        : player.status === "EXPIRED"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {player.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{player.licenseType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
