"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, FileText } from "lucide-react";

import {
  formatDate,
  formatDateShort,
  getStatusColor,
  getStatusText,
  getAge,
} from "@/lib/utils";

import { License } from "@/types/type";
import Loading from "@/components/ui/Loading";

export default function LicensePage() {
  const params = useParams();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLicense() {
      try {
        setLoading(true);
        const response = await fetch(`/api/licenses/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch license");
        }

        setLicense(data.license || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchLicense();
    }
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !license) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-background" />
          </div>
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            Licence introuvable
          </h2>
          <p className="text-muted-foreground mb-4">
            {error || "Cette licence n'existe pas ou a été supprimée."}
          </p>
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12  bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/all-players"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Licence Officielle
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {license.name} {license.surname} - N° {license.licenseNumber}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* License Card */}
  <div className="relative overflow-hidden rounded-xl shadow-xl mb-8">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
    <div className="relative p-8 text-white">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">
            Fédération Togolaise de Football
          </h2>
          <p className="text-blue-100">Ligue de Football Lomé Golfe</p>
        </div>
        <div className="text-right bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
          <p className="text-blue-100 text-sm mb-1">Licence N°</p>
          <p className="text-2xl font-bold tracking-wide">{license.licenseNumber}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Image Section */}
        <div className="flex-shrink-0">
          {license.photoUrl ? (
            <img
              src={license.photoUrl}
              alt={`${license.name} ${license.surname}`}
              className="w-32 h-40 object-cover rounded-lg border-4 border-white shadow-2xl"
            />
          ) : (
            <div className="w-32 h-40 bg-white/20 backdrop-blur-sm rounded-lg border-4 border-white flex items-center justify-center">
              <User className="w-12 h-12 text-white/70" />
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-3 text-sm">
          <div className="flex gap-2">
            <span className="font-semibold text-blue-100 min-w-[100px]">Club:</span>
            <span className="flex-1 border-b border-dotted border-white/50 pb-1">{license.clubName}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold text-blue-100 min-w-[100px]">Nom:</span>
            <span className="flex-1 border-b border-dotted border-white/50 pb-1">{license.surname}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold text-blue-100 min-w-[100px]">Prénom:</span>
            <span className="flex-1 border-b border-dotted border-white/50 pb-1">{license.name}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold text-blue-100 min-w-[100px]">Né le:</span>
            <span className="flex-1 border-b border-dotted border-white/50 pb-1">
              {formatDate(new Date(license.dateOfBirth))}
            </span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold text-blue-100 min-w-[100px]">À:</span>
            <span className="flex-1 border-b border-dotted border-white/50 pb-1">{license.state}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold text-blue-100 min-w-[100px]">District:</span>
            <span className="flex-1 border-b border-dotted border-white/50 pb-1">{license.district}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Detailed Information */}
  <div className="grid md:grid-cols-2 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3 pb-3 border-b border-gray-200">
        <div className="p-2 bg-blue-50 rounded-lg">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        Informations personnelles
      </h3>
      <div className="space-y-4 divide-y divide-gray-200">
        <div className="pt-4 first:pt-0">
          <p className="text-sm text-gray-500 mb-1">Date de naissance</p>
          <p className="font-semibold text-gray-900">
            {formatDate(new Date(license.dateOfBirth))}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {getAge(license.dateOfBirth)} ans
          </p>
        </div>
        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-1">Adresse</p>
          <p className="font-semibold text-gray-900">{license.address}</p>
        </div>
        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-1">État</p>
          <p className="font-semibold text-gray-900">{license.state}</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3 pb-3 border-b border-gray-200">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        Statut de la licence
      </h3>
      <div className="space-y-4 divide-y divide-gray-200">
        <div className="pt-4 first:pt-0">
          <p className="text-sm text-gray-500 mb-2">Statut actuel</p>
          <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(license.status)}`}>
            {getStatusText(license.status)}
          </span>
        </div>
        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-1">Date d&apos;enregistrement</p>
          <p className="font-semibold text-gray-900">
            {formatDate(new Date(license.registrationDate))}
          </p>
        </div>
        {license.expiryDate && (
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-1">Date d&apos;expiration</p>
            <p className="font-semibold text-gray-900">
              {formatDate(new Date(license.expiryDate))}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Renewal History */}
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200">
      Historique des renouvellements
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Array.from({ length: 5 }, (_, index) => {
        const renewal = license.renewals[index];
        return (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all ${
              renewal
                ? "border-green-500 bg-green-50 shadow-sm"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Saison {index + 1}
              </p>
              {renewal ? (
                <>
                  <p className="font-bold text-gray-900 mb-1">
                    {renewal.season}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatDateShort(new Date(renewal.renewalDate))}
                  </p>
                  {renewal.notes && (
                    <p className="text-xs text-gray-700 mt-2 italic">
                      {renewal.notes}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-400">Non renouvelé</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</main>
    </div>
  );
}
