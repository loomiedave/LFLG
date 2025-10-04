import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;

  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // If birthday hasn’t happened yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
