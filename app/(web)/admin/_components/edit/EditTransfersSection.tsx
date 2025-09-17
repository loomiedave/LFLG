// components/EditTransfersSection.tsx
"use client";

import { Plus } from "lucide-react";
import { Transfer } from "@/types/license";
import TransferItem from "../../_components/create/TransferItem"; // Reused from previous refactor

interface EditTransfersSectionProps {
  transfers: Transfer[];
  onAddTransfer: () => void;
  onUpdateTransfer: (id: string, field: keyof Transfer, value: any) => void;
  onRemoveTransfer: (id: string) => Promise<void>;
}

export default function EditTransfersSection({ 
  transfers, 
  onAddTransfer, 
  onUpdateTransfer, 
  onRemoveTransfer 
}: EditTransfersSectionProps) {
  const handleRemoveTransfer = async (id: string) => {
    try {
      await onRemoveTransfer(id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error removing transfer");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Historique des transferts
        </h2>
        <button
          type="button"
          onClick={onAddTransfer}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {transfers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            Aucun transfert enregistré
          </p>
        ) : (
          transfers.map((transfer) => (
            <TransferItem
              key={transfer.id}
              transfer={transfer}
              onUpdate={onUpdateTransfer}
              onRemove={handleRemoveTransfer}
            />
          ))
        )}
      </div>
    </div>
  );
}