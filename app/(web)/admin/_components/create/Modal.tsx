"use client";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

interface ModalProp {
  text: string;
  type?: "success" | "error";
}

export default function Modal({ text, type }: ModalProp) {
  const router = useRouter();

  const handleClose = () => {
    router.push("/admin");
  };

  return (
    <div className="fixed inset-0 bg-black/70 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {type === "success" ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-600 dark:text-gray-300">{text}</p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Retour à l&apos;administration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
