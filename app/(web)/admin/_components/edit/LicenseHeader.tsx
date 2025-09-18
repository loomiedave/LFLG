// components/LicenseHeader.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { License } from "@/types/license";

interface LicenseHeaderProps {
  license: License;
}

export default function LicenseHeader({ license }: LicenseHeaderProps) {
  return (
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
          Modifier la licence
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {license.name} {license.surname} - N° {license.licenseNumber}
        </p>
      </div>
    </div>
  );
}
