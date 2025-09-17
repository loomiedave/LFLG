// components/ErrorMessage.tsx
"use client";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <p className="text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
}