import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function generateLicenseNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-primary-foreground bg-success";
      case "EXPIRED":
        return "text-primary-foreground bg-destructive";
      case "SUSPENDED":
        return "text-primary-foreground bg-accent";
      case "REVOKED":
        return "text-primary-foreground bg-destructive";
      default:
        return "text-primary-foreground bg-muted-foreground";
    }
  };

  export const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Active";
      case "EXPIRED":
        return "Expirée";
      case "SUSPENDED":
        return "Suspendue";
      case "REVOKED":
        return "Révoquée";
      default:
        return status;
    }
  };
