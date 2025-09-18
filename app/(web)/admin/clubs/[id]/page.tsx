// app/admin/clubs/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Affiliation } from "@/types/registry";

export default function ClubDetailPage() {
  const [club, setClub] = useState<Affiliation | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchClub(params.id as string);
    }
  }, [params.id]);

  const fetchClub = async (id: string) => {
    try {
      const response = await fetch(`/api/affiliations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setClub(data);
      }
    } catch (error) {
      console.error("Failed to fetch club:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!club) return <div className="p-6">Clube non trouver</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <Link href="/admin/clubs" className="text-blue-600 hover:text-blue-900">
          ← retour
        </Link>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Telecharge
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 print:shadow-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Recu - Affiliation
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                District
              </label>
              <p className="text-lg text-gray-800">{club.districtName}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Nom du club
              </label>
              <p className="text-lg text-gray-800 font-medium">
                {club.clubName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Addresse
              </label>
              <p className="text-lg text-gray-800">{club.address}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Representatif
              </label>
              <p className="text-lg text-gray-800">{club.leader}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Contact
              </label>
              <p className="text-lg text-gray-800">{club.contact}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                date d&apos;enregistrement
              </label>
              <p className="text-lg text-gray-800">
                {new Date(club.dateRegistered).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-700">frais payés:</span>
            <span className="text-2xl font-bold text-green-600">
              {club.feesPaid} CFA
            </span>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 print:block">
          <p>ID d&apos;enregistrement: {club.id}</p>
          <p>le: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
