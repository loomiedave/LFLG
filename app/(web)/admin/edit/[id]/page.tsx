"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LicenseHeader from "../../_components/edit/LicenseHeader";
import EditPersonalInfoSection from "../../_components/edit/EditPersonalInfoSection";
import EditClubInfoSection from "../../_components/edit/EditClubInfoSection";
import EditPhotoUploadSection from "../../_components/edit/EditPhotoUploadSection";
import LoadingSpinner from "../../_components/edit/LoadingSpinner";
import ErrorMessage from "../../_components/edit/ErrorMessage";
import { licenseToFormData } from "../../utils/licenseUtils";
import { updateLicense, saveTransfers } from "@/app/api/licenseApi";
import { EditFormData, Transfer } from "@/types/license";

export default function EditLicensePage() {
  const params = useParams();
  const router = useRouter();
  const [licenseId, setLicenseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [license, setLicense] = useState<any>(null);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [formData, setFormData] = useState<EditFormData>({
    licenseType: "PLAYER",
    status: "ACTIVE",
    name: "",
    surname: "",
    dateOfBirth: "",
    address: "",
    state: "",
    district: "",
    clubName: "",
    clubId: "", // Add this field
    photoUrl: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (params?.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      setLicenseId(id);
    }
  }, [params]);

  useEffect(() => {
    if (!licenseId) return;

    const fetchLicense = async () => {
      setFetchLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/licenses/${licenseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch license');
        }
        const data = await response.json();
        setLicense(data.license || data); // Handle both response formats
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchLicense();
  }, [licenseId]);

  useEffect(() => {
    if (license) {
      setFormData(licenseToFormData(license));
      
      if (license.transfers) {
        const formattedTransfers = license.transfers.map((t: Transfer) => ({
          ...t,
          transferDate: t.transferDate.split("T")[0]
        }));
        setTransfers(formattedTransfers);
      }
    }
  }, [license]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseId) return;

    setLoading(true);

    try {
      await updateLicense(licenseId, formData);
      await saveTransfers(licenseId, transfers);
      router.push("/admin");
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhotoChange = (url: string) => {
    setFormData((prev) => ({ ...prev, photoUrl: url }));
  };

  if (fetchLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!license) {
    return <ErrorMessage message="Licence introuvable" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <LicenseHeader license={license} />

        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <EditPersonalInfoSection 
              formData={formData} 
              onChange={handleChange} 
            />

            <div className="space-y-6">
              <EditClubInfoSection 
                formData={formData} 
                onChange={handleChange} 
              />
              <EditPhotoUploadSection 
                photoUrl={formData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Link
              href="/admin"
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
              )}
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}