"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CreateHeader from "../_components/create/CreateHeader";
import PersonalInfoSection from "../_components/create/PersonalInfoSection";
import ClubInfoSection from "../_components/create/ClubInfoSection";
import PhotoUploadSection from "../_components/create/PhotoUploadSection";
import { LicenseFormData } from "@/types/license";

export default function CreateLicensePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LicenseFormData>({
    licenseType: "PLAYER",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/licenses", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, // Fix: add headers
        body: JSON.stringify(formData) // Fix: send actual form data
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create license");
      }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CreateHeader />

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Info */}
            <PersonalInfoSection 
              formData={formData} 
              onChange={handleChange} 
            />

            {/* Middle Column - Club Info & Photo */}
            <div className="space-y-6">
              <ClubInfoSection 
                formData={formData} 
                onChange={handleChange} 
              />
              <PhotoUploadSection 
                photoUrl={formData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
            </div>
          </div>

          {/* Submit Buttons */}
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
              {loading ? "Création..." : "Créer la licence"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}