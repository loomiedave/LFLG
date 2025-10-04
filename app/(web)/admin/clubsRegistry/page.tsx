"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Affiliation } from "@/types/registry";
import AdminNav from "../_components/nav/AdminNav";

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Affiliation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/affiliations");
      if (response.ok) {
        const data = await response.json();
        setClubs(data);
      }
    } catch (error) {
      console.error(
        "Erreur de connexion: échec de récupération des clubs:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="min-h-screen">
      <AdminNav />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clubs enregistrés</h1>
          <Link
            href="/admin/clubs/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Inscrire une nouvelle club
          </Link>
        </div>

        {clubs.length === 0 ? (
          <p className="text-gray-500">Aucun club n&apos;est encore inscrit.</p>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nom du club
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Représentatif
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date d&apos;enregistrement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Frais
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clubs.map((club) => (
                  <tr key={club.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/clubs/${club.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {club.clubName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {club.districtName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {club.leader}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(club.dateRegistered).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {club.feesPaid} CFA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
