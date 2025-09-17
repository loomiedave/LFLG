// app/admin/clubs/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CreateAffiliationData } from '@/types/registry';

export default function NewClubPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAffiliationData>({
    districtName: '',
    clubName: '',
    address: '',
    leader: '',
    contact: '',
    feesPaid: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/affiliations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/clubs');
      } else {
        alert('Failed to register club');
      }
    } catch (error) {
      alert('Failed to register club');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'feesPaid' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link 
          href="/admin/clubs"
          className="text-blue-600 hover:text-blue-900"
        >
          ← Back to Clubs
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Club Affiliation Form</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="districtName" className="block text-sm font-medium text-gray-700 mb-2">
                District Name
              </label>
              <input
                type="text"
                id="districtName"
                name="districtName"
                value={formData.districtName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-2">
                Club Name
              </label>
              <input
                type="text"
                id="clubName"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="leader" className="block text-sm font-medium text-gray-700 mb-2">
                Representative
              </label>
              <input
                type="text"
                id="leader"
                name="leader"
                value={formData.leader}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="feesPaid" className="block text-sm font-medium text-gray-700 mb-2">
              Fees Paid (CFA)
            </label>
            <input
              type="number"
              id="feesPaid"
              name="feesPaid"
              value={formData.feesPaid}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register Club'}
            </button>
            <Link
              href="/admin/clubs"
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}