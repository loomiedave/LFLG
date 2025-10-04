"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import {
  formatDate,
} from "@/lib/utils";
import PrintPageHeader from "../../_components/PrintPageHeader";
import { License } from "@/types/type";
import Loading from "@/components/ui/Loading";
import { User, FileText } from "lucide-react";

export default function PlayerPage() {
  const params = useParams();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
      @page {
        size: A4;
        margin: 5mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  useEffect(() => {
    async function fetchLicense() {
      try {
        setLoading(true);
        const response = await fetch(`/api/licenses/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch license");
        }

        setLicense(data.license || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchLicense();
    }
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !license) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-background" />
          </div>
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            Licence introuvable
          </h2>
          <p className="text-muted-foreground mb-4">
            {error || "Cette licence n'existe pas ou a été supprimée."}
          </p>
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/admin" className="hover:text-primary underline">
          retour
        </Link>
      </nav>

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Imprimer ({license.licenseNumber})
        </button>
      </div>

      <div ref={printRef}>
        <div className="bg-white text-black p-8 max-w-4xl mx-auto ">
          {/* Main Card */}
          <div className="border-2 border-black mb-4">
            <div className="border border-gray-800 m-2 rounded-lg">
              <PrintPageHeader />
            </div>
            <div className="flex p-6 gap-6">
            {/* Image Section */}
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold mb-2 border-b border-dotted border-black">
                N°: <span className="text-red-600">{license.licenseNumber}</span>
              </div>
              {license.photoUrl ? (
                <img
                  src={license.photoUrl}
                  alt={`${license.name} ${license.surname}`}
                  className="w-32 h-40 object-cover border-2 rounded-md border-black"
                />
              ) : (
                <div className="w-32 h-40 border-2 border-black flex items-center justify-center bg-gray-100">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex-1 space-y-2 text-sm flex flex-col justify-between">
              <div className="flex gap-2">
                <span className="font-semibold">Club:</span>
                <span className="flex-1 border-b border-dotted border-black font-bold text-2xl">{license.clubName}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-semibold">Nom:</span>
                <span className="flex-1 border-b border-dotted border-black text-xl font-bold">{license.surname}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-semibold">Prénoms:</span>
                <span className="flex-1 border-b border-dotted border-black text-xl font-bold">{license.name}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-semibold">Né le:</span>
                <span className="flex-1 border-b border-dotted border-black text-lg">{formatDate(new Date(license.dateOfBirth))}</span>
                <span className="font-semibold ml-4">À:</span>
                <span className="flex-1 border-b border-dotted border-black text-md">{license.state}</span>
              </div>
            </div>
          </div>

            {/* Blue Banner */}
            <div className="text-blue-800 text-center py-3 font-semibold border-t border-gray-800 flex items-center gap-4">
              <div className="flex-1 border-t-2 border-blue-800 italic"></div>
               <span className="italic">Ensemble pour la consolidation</span>
              <div className="flex-1 border-t-2 border-blue-800"></div>
            </div>
          </div>

          {/* Category Card */}
          <div className="border-2 border-black p-6">
            <h3 className="text-lg font-bold mb-4 text-center">CATÉGORIE</h3>

            {/* 5 Boxes with Triangles */}
            <div className="flex justify-center gap-8 mb-8">
              {["P", "M", "E", "J", "C"].map((letter, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 border-2 border-black mb-2"></div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black mb-1"></div>
                  <span className="font-semibold">{letter}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center pt-4 border-t-2 border-black">
              <div>
                <p className="text-sm font-semibold">Date d&apos;enregistrement:</p>
                <p className="text-sm">
                  {formatDate(new Date(license.registrationDate))}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Signature de l&apos;administration:</p>

                <div className="w-32 h-12 border-b-2 border-black mt-2"></div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">Signature:</p>
                <div className="w-32 h-12 border-b-2 border-black mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
