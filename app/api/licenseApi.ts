// api/licenseApi.ts
import { EditFormData, Transfer } from "@/types/license";

export async function updateLicense(licenseId: string, formData: EditFormData) {
  const response = await fetch(`/api/licenses/${licenseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to update license");
  }

  return response.json();
}

export async function saveTransfers(licenseId: string, transfers: Transfer[]) {
  for (const transfer of transfers) {
    if (transfer.id.startsWith("temp-")) {
      // Create new transfer
      const { id, ...transferData } = transfer;
      await fetch(`/api/licenses/${licenseId}/transfers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData),
      });
    } else {
      // Update existing transfer
      await fetch(`/api/transfers/${transfer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transfer),
      });
    }
  }
}
