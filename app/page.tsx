"use client";

import { useState } from "react";
import { Search, FileText, Users } from "lucide-react";
import HeroSection from "@/components/page/HeroSection";
import FeaturesSection from "@/components/page/FeaturesSection";
import ConstactInfo from "@/components/page/ContactInfo";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "license">("name");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const params = new URLSearchParams();
    if (searchType === "name") {
      params.set("name", searchTerm);
    } else {
      params.set("licenseNumber", searchTerm);
    }

    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Recherche de Licence
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Saisissez les informations pour vérifier une licence
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-8">
              {/* Search Type Selection */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
                  Type de recherche
                </label>
                <div className="flex justify-center gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="searchType"
                      value="name"
                      checked={searchType === "name"}
                      onChange={(e) => setSearchType(e.target.value as "name")}
                      className="sr-only"
                    />
                    <div
                      className={`px-6 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        searchType === "name"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">Par nom</span>
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="searchType"
                      value="license"
                      checked={searchType === "license"}
                      onChange={(e) =>
                        setSearchType(e.target.value as "license")
                      }
                      className="sr-only"
                    />
                    <div
                      className={`px-6 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        searchType === "license"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">
                          Par numéro de licence
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Search Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {searchType === "name"
                    ? "Nom du joueur/entraîneur"
                    : "Numéro de licence"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchType === "name" ? "Nom" : "ID"}
                    className="w-full px-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Rechercher</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {searchType === "name"
                    ? "Vous pouvez saisir le nom complet ou seulement le prénom/nom de famille"
                    : "Le numéro de licence se trouve sur la carte officielle du joueur/entraîneur"}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <ConstactInfo />
    </div>
  );
}
