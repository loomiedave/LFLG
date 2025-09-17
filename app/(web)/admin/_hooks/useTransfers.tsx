// hooks/useTransfers.ts
"use client";

import { useState } from "react";
import { Transfer } from "@/types/license";

export function useTransfers() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const addTransfer = () => {
    const newTransfer: Transfer = {
      id: `temp-${Date.now()}`,
      fromClub: "",
      toClub: "",
      transferDate: new Date().toISOString().split('T')[0],
      type: "PERMANENT",
      status: "PENDING",
      season: new Date().getFullYear().toString(),
      notes: ""
    };
    setTransfers([...transfers, newTransfer]);
  };

  const removeTransfer = (id: string) => {
    setTransfers(transfers.filter(t => t.id !== id));
  };

  const updateTransfer = (id: string, field: keyof Transfer, value: any) => {
    setTransfers(transfers.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  return {
    transfers,
    addTransfer,
    removeTransfer,
    updateTransfer
  };
}