"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Edit,
  Trash2,
  RefreshCw,
  User,
  LucidePrinter,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getStatusColor, getStatusText } from "@/lib/utils";
import AdminNav from "./_components/nav/AdminNav";
import  { License } from '@/types/type';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdminDashboard() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/licenses");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch licenses");
      }

      setLicenses(data.licenses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette licence ?")) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await fetch(`/api/licenses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete license");
      }

      setLicenses(licenses.filter((license) => license.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch =
      searchTerm === "" ||
      license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.clubName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || license.status === statusFilter;
    const matchesType =
      typeFilter === "all" || license.licenseType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: licenses.length,
    active: licenses.filter((l) => l.status === "ACTIVE").length,
    expired: licenses.filter((l) => l.status === "EXPIRED").length,
    players: licenses.filter((l) => l.licenseType === "PLAYER").length,
    coaches: licenses.filter((l) => l.licenseType === "COACH").length,
  };

  return (
    <div className="min-h-screen">
      <AdminNav />
      <div className="p-4">
        <div className="relative justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gestion des licences
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Administration des licences de la Fédération Togolaise de Football
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.active}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Actives</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.expired}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Expirées</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.players}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Joueurs</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.coaches}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Entraîneurs
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-12 border rounded-md py-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input w-auto py-2 border rounded-md"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="ACTIVE">Active</option>
                  <option value="EXPIRED">Expirée</option>
                  <option value="SUSPENDED">Suspendue</option>
                  <option value="REVOKED">Révoquée</option>
                </select>
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="input w-auto py-2 border rounded-md"
              >
                <option value="all">Tous les types</option>
                <option value="PLAYER">Joueur</option>
                <option value="COACH">Entraîneur</option>
              </select>
            </div>
          </div>
        </div>

        {/* License List */}
        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Chargement des licences...
            </p>
          </div>
        ) : error ? (
          <div className="card p-8 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button onClick={fetchLicenses} className="btn-primary">
              Réessayer
            </button>
          </div>
        ) : filteredLicenses.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "Aucune licence ne correspond aux critères de recherche."
                : "Aucune licence enregistrée."}
            </p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Joueur/Entraîneur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Licence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Club & Zone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date d&apos;inscription
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredLicenses.map((license) => (
                    <tr
                      key={license.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {license.photoUrl ? (
                            <img
                              src={license.photoUrl}
                              alt={`${license.name} ${license.surname}`}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {license.name} {license.surname}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {license.licenseType === "PLAYER"
                                ? "Joueur"
                                : "Entraîneur"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {license.licenseNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {license.clubName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {license.district}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}
                        >
                          {getStatusText(license.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(new Date(license.registrationDate))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/license/${license.id}`}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                              >
                                Voir
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Voir la licence</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/admin/player/${license.id}`}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                              >
                                <LucidePrinter className="w-4 h-4" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Imprimer</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/admin/edit/${license.id}`}
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Modifier</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/admin/renew/${license.id}`}
                                className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Renouveler</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleDelete(license.id)}
                                disabled={deleteLoading === license.id}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50"
                              >
                                {deleteLoading === license.id ? (
                                  <div className="w-4 h-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full"></div>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Supprimer</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
