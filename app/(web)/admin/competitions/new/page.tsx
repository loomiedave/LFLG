// app/admin/competitions/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreateCompetitionData } from "@/types/registry";

export default function NewCompetitionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateCompetitionData>({
    competitionTitle: "",
    districtName: "",
    clubName: "",
    address: "",
    leader: "",
    contact: "",
    feesPaid: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/competitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/competitions");
      } else {
        alert("Erreur de connexion : Échec de l'enregistrement");
      }
    } catch (error) {
      alert("Erreur de connexion : Échec de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "feesPaid" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin/competitions"
          className="text-blue-600 hover:text-blue-900"
        >
          ← retour
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Formulaire d&apos;inscription au Competition
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="competitionTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Titre
            </label>
            <input
              type="text"
              id="competitionTitle"
              name="competitionTitle"
              value={formData.competitionTitle}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="districtName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom du district
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
              <label
                htmlFor="clubName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom du club
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
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Addresse
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
              <label
                htmlFor="leader"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
            <label
              htmlFor="feesPaid"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Frais payés (CFA)
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
              {loading ? "Enregistrement..." : "Inscription au competition"}
            </button>
            <Link
              href="/admin/competitions"
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
