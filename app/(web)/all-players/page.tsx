"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Player, ApiResponse } from "@/types/type";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/Error";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players");
        const data: ApiResponse = await response.json();

        if (data.success) {
          setPlayers(data.data);
        } else {
          setError(data.error || "Failed to fetch players");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Players</h1>
          <p className="text-muted-foreground mt-2">
            Showing {players.length} active players
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {players.map((player) => (
            <Link
              key={player.id}
              href={`/license/${player.id}`}
              className="block"
            >
              <div className="bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 cursor-pointer transform hover:scale-105 transition-transform border border-border">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
                  {player.photoUrl ? (
                    <img
                      src={player.photoUrl}
                      alt={`${player.name} ${player.surname}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentNode as HTMLElement;
                        const div = document.createElement("div");
                        div.className =
                          "w-full h-full flex items-center justify-center bg-muted text-muted-foreground";
                        div.innerHTML = `
                          <div class="text-center">
                            <div class="text-2xl mb-2">👤</div>
                            <div class="text-xs">No Image</div>
                          </div>
                        `;
                        parent.appendChild(div);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                      <div className="text-center">
                        <div className="text-2xl mb-2">👤</div>
                        <div className="text-xs">No Image</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-foreground text-sm">
                    {player.name} {player.surname}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {player.clubName}
                  </p>
                  <p className="text-xs text-muted-foreground opacity-70">
                    {player.district}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-2">
              No players found
            </div>
            <p className="text-muted-foreground opacity-70">
              There are currently no active players registered.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
