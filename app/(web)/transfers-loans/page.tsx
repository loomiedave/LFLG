// app/transfers-loans/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRightLeft, Building, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Loading from "@/components/ui/Loading";
import { getStatusColor, getStatusText } from "./_utils/utils";
import { Transfer, Loan  } from "./_utils/types";
import Header from "./_components/Header";

export default function TransfersLoansPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transfers" | "loans">(
    "transfers",
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [transfersRes, loansRes] = await Promise.all([
          fetch("/api/transfers"),
          fetch("/api/loans"),
        ]);

        const transfersData = await transfersRes.json();
        const loansData = await loansRes.json();

        setTransfers(transfersData.transfers || []);
        setLoans(loansData.loans || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {return <Loading /> }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
     <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab("transfers")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === "transfers"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            Transferts ({transfers.length})
          </button>
          <button
            onClick={() => setActiveTab("loans")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === "loans"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Building className="w-4 h-4" />
            Prêts ({loans.length})
          </button>
        </div>

        {/* Transfers Tab */}
        {activeTab === "transfers" && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Liste des Transferts
              </h2>
            </div>

            {transfers.length === 0 ? (
              <div className="text-center py-12">
                <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun transfert enregistré
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium">
                        Joueur
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        De
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Vers
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Statut
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Saison
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Montant
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfers.map((transfer) => (
                      <tr
                        key={transfer.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {transfer.license.name}{" "}
                                {transfer.license.surname}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {transfer.license.licenseNumber}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {transfer.fromClub}
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {transfer.toClub}
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {formatDate(new Date(transfer.transferDate))}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm muted-foreground">
                            {getStatusText(transfer.type)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(transfer.status)}`}
                          >
                            {getStatusText(transfer.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 muted-foreground">
                          {transfer.season}
                        </td>
                        <td className="py-3 px-4 muted-foreground">
                          {transfer.fee
                            ? `${transfer.fee.toLocaleString()} CFA`
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Loans Tab */}
        {activeTab === "loans" && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Liste des Prêts
              </h2>
            </div>

            {loans.length === 0 ? (
              <div className="text-center py-12">
                <Building className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  Aucun prêt enregistré
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Joueur
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Club Parent
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Club d&apos;Accueil
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Début
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Fin
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Statut
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Saison
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => (
                      <tr
                        key={loan.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-foreground">
                                {loan.license.name} {loan.license.surname}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {loan.license.licenseNumber}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {loan.parentClub}
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {loan.hostClub}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(new Date(loan.startDate))}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(new Date(loan.endDate))}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(loan.status)}`}
                          >
                            {getStatusText(loan.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {loan.season}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
