"use client";
import { useState, useEffect } from "react";
import { District, Club } from "@/types/admin";

export default function AdminPage() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  const [districtName, setDistrictName] = useState("");
  const [clubName, setClubName] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [districtsRes, clubsRes] = await Promise.all([
        fetch("/api/admin/districts"),
        fetch("/api/admin/clubs"),
      ]);

      const districtsData = await districtsRes.json();
      const clubsData = await clubsRes.json();

      setDistricts(districtsData.districts || []);
      setClubs(clubsData.clubs || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDistrict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!districtName.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/districts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: districtName }),
      });

      if (res.ok) {
        setDistrictName("");
        fetchData();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create district");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create district");
    } finally {
      setSubmitting(false);
    }
  };

  const createClub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName.trim() || !selectedDistrictId || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clubName,
          districtId: selectedDistrictId,
        }),
      });

      if (res.ok) {
        setClubName("");
        setSelectedDistrictId("");
        fetchData();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create club");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create club");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Administration - Clubs & Zone</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Create District */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create District</h2>
          <form onSubmit={createDistrict}>
            <input
              type="text"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              placeholder="District name"
              className="w-full p-3 border rounded-lg mb-4"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !districtName.trim()}
              className="w-full bg-primary text-background p-3 rounded-lg hover:bg-primary-dim disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create District"}
            </button>
          </form>
        </div>

        {/* Create Club */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create Club</h2>
          <form onSubmit={createClub}>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              disabled={submitting}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Club name"
              className="w-full p-3 border rounded-lg mb-4"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !clubName.trim() || !selectedDistrictId}
              className="w-full bg-primary text-background p-3 rounded-lg hover:bg-primary-dim disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Club"}
            </button>
          </form>
        </div>
      </div>

      {/* Districts List */}
      <div className="mt-8 bg-background border-muted-foreground text-foreground border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Zone ({districts.length})
        </h2>
        <div className="grid gap-2">
          {districts.map((district) => (
            <div
              key={district.id}
              className="flex justify-between items-center p-3 bg-border rounded"
            >
              <span className="font-medium">{district.name}</span>
              <span className="text-sm">{district._count.clubs} clubs</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clubs List */}
      <div className="mt-8 bg-background border-muted-foreground text-foreground border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Clubs ({clubs.length})</h2>
        <div className="grid gap-2">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="flex justify-between items-center p-3 bg-border rounded"
            >
              <div>
                <span className="font-medium">{club.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({club.district.name})
                </span>
              </div>
              <span className="text-sm">{club._count.licenses} players</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
