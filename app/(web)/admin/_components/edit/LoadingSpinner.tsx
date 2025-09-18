// components/LoadingSpinner.tsx
"use client";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Chargement...",
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}
