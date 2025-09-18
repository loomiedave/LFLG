// components/EditPhotoUploadSection.tsx

"use client";

import { useState } from "react";
import { User } from "lucide-react";

interface EditPhotoUploadSectionProps {
  photoUrl: string;
  onPhotoChange: (url: string) => void;
}

export default function EditPhotoUploadSection({
  photoUrl,
  onPhotoChange,
}: EditPhotoUploadSectionProps) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner un fichier image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("La taille du fichier ne doit pas dépasser 10 MO");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onPhotoChange(data.url);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred uploading the image",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Photo d&apos;identité
      </h2>

      <div className="space-y-4">
        {photoUrl ? (
          <div className="text-center">
            <img
              src={photoUrl}
              alt="Photo d'identité"
              className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 mx-auto mb-4"
            />
            <button
              type="button"
              onClick={() => onPhotoChange("")}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700"
            >
              Supprimer
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Aucune photo</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
}
