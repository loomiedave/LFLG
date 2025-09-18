// app/admin/competitions/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Competition } from "@/types/registry";

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/competitions")
      .then((res) => res.json())
      .then((data) => setCompetitions(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Compétitions</h1>
        <Link
          href="/admin/competitions/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enregistrer un nouveau compétitions
        </Link>
      </div>

      {competitions.length === 0 ? (
        <p className="text-gray-500">
          Aucune compétition n&apos;est encore enregistrée.
        </p>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nom du club
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nom du district
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date d&apos;inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Frais
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitions.map((comp) => (
                <tr key={comp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/competitions/${comp.id}`}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      {comp.competitionTitle}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {comp.clubName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {comp.districtName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(comp.dateRegistered).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {comp.feesPaid} CFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
