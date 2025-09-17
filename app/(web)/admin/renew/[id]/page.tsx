"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw, User } from "lucide-react";
import { formatDate, getStatusText, getStatusColor } from "@/lib/utils";
import { License } from "@/types/type";
import Loading from "@/components/ui/Loading";

export default function RenewLicensePage() {
  const params = useParams();
  const router = useRouter();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    season: "",
    notes: "",
    expiryDate: "",
  });

  useEffect(() => {
    fetchLicense();
    const currentYear = new Date().getFullYear();
    setFormData((prev) => ({
      ...prev,
      season: `${currentYear}/${currentYear + 1}`,
      expiryDate: new Date(currentYear + 1, 5, 30).toISOString().split("T")[0], // June 30 of next year
    }));
  }, [params.id]);

  const fetchLicense = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch(`/api/licenses/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch license");
      }

      setLicense(data.license);
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
      router.push("/admin");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/licenses/${params.id}/renew`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to renew license");
      }

      router.push("/admin");
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (fetchLoading) { return <Loading /> }

  if (!license) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">Licence introuvable</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Renouvellement de licence
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {license.name} {license.surname} - N° {license.licenseNumber}
          </p>
        </div>
      </div>

      <div className="max-w-4xl grid md:grid-cols-2 gap-8">
        {/* License Information */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations de la licence
          </h2>

          <div className="flex items-center gap-4 mb-6">
            {license.photoUrl ? (
              <img
                src={license.photoUrl}
                alt={`${license.name} ${license.surname}`}
                className="w-16 h-20 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-16 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {license.name} {license.surname}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {license.licenseType === "PLAYER" ? "Joueur" : "Entraîneur"} -{" "}
                {license.clubName}
              </p>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${getStatusColor(license.status)}`}
              >
                {getStatusText(license.status)}
              </span>
            </div>
          </div>

          {/* Renewal History */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Historique des renouvellements ({license.renewals.length}/5)
            </h4>

            {license.renewals.length > 0 ? (
              <div className="space-y-3">
                {license.renewals.map((renewal) => (
                  <div
                    key={renewal.id}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Saison {renewal.season}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(new Date(renewal.renewalDate))}
                        </p>
                        {renewal.notes && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {renewal.notes}
                          </p>
                        )}
                      </div>
                      <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                        Renouvelé
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Aucun renouvellement enregistré
              </p>
            )}
          </div>
        </div>

        {/* Renewal Form */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Nouveau renouvellement
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Saison
              </label>
              <input
                type="text"
                name="season"
                value={formData.season}
                onChange={handleChange}
                placeholder="ex: 2024/2025"
                className="input"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Format recommandé: YYYY/YYYY
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nouvelle date d&apos;expiration
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (optionnel)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Commentaires ou informations supplémentaires..."
                className="input resize-none"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Effet du renouvellement:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• La licence sera automatiquement activée</li>
                <li>• Une nouvelle entrée sera ajoutée à l&apos;historique</li>
                <li>• La date d&apos;expiration sera mise à jour</li>
                <li>• Le statut passera à &apos;Active&apos; si nécessaire</li>
              </ul>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin" className="btn-secondary">
                Annuler
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                )}
                {loading ? "Renouvellement..." : "Renouveler la licence"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
