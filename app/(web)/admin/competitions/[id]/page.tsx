// app/admin/competitions/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Competition } from '@/types/registry';

export default function CompetitionDetailPage() {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetch(`/api/competitions/${params.id}`)
        .then(res => res.json())
        .then(data => setCompetition(data))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!competition) return <div className="p-6">Competition not found</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <Link href="/admin/competitions" className="text-blue-600 hover:text-blue-900">
          ← retour
        </Link>
        <button 
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Telecharge
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 print:shadow-none print-receipt">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Recu Registration de competition</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Competition</label>
              <p className="text-lg text-gray-800 font-medium">{competition.competitionTitle}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Zone</label>
              <p className="text-lg text-gray-800">{competition.districtName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Nom du Clube</label>
              <p className="text-lg text-gray-800">{competition.clubName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Addresse</label>
              <p className="text-lg text-gray-800">{competition.address}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Representative</label>
              <p className="text-lg text-gray-800">{competition.leader}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Contacte</label>
              <p className="text-lg text-gray-800">{competition.contact}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Date Registerer</label>
              <p className="text-lg text-gray-800">{new Date(competition.dateRegistered).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-700">Payer:</span>
            <span className="text-2xl font-bold text-green-600">CFA{competition.feesPaid}</span>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Registration ID: {competition.id}</p>
          <p>Generated on: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}