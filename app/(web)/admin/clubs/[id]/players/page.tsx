"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { ClubWithLicenses } from "@/types/type";
import { getAge, formatDate } from "@/lib/utils";
import PrintPageHeader from "../../../_components/PrintPageHeader";
import PrintPageHeader2 from "../../../_components/PrintPageHeader2";

export default function PlayersPage() {
  const params = useParams();
  const [club, setClub] = useState<ClubWithLicenses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
      @page {
        size: A4 landscape;
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
    if (!params.id) {
      setLoading(false);
      return;
    }

    fetch(`/api/clubs/${params.id}/players`)
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Frontend received:", data);

        if (data.error) {
          setError(data.error);
          setClub(null);
        } else {
          setClub(data);
          setError(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch club data");
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error: {error}</div>;
  if (!club) return <div className="p-8">Club not found</div>;

  const activePlayers = club.licenses.filter((p) => p.status === "ACTIVE");
  const CARDS_PER_PAGE = 8;
  const totalPages = Math.ceil(activePlayers.length / CARDS_PER_PAGE);
  const startIdx = currentPage * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const currentPlayers = activePlayers.slice(startIdx, endIdx);
 
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link
          href="/admin/clubs&districts"
          className="hover:text-primary underline"
        >
          retour
        </Link>
      </nav>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
          <p className="text-muted-foreground">
            {activePlayers.length} active players
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Print Page {currentPage + 1}
        </button>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <div ref={printRef}>
        <div className="bg-white p-4 text-black">
          <PrintPageHeader />
          <h1 className="text-xl font-bold mb-2 text-gray-600">{club.name}</h1>
          <div className="grid grid-cols-4 gap-2">
          {currentPlayers.map((license) => (
  <div
    key={license.id}
    className="border border-black mb-3 rounded-md text-[10px] leading-tight"
  >
    {/* Header */}
    <div className="border border-gray-800 rounded-md">
      <PrintPageHeader2 />
    </div>

    {/* Main Content */}
    <div className="flex p-2 gap-3">
      {/* Image Section */}
      <div className="flex flex-col items-center w-24">
        <div className="text-[9px] font-bold mb-1 border-b border-dotted border-black">
          N°: <span className="text-red-600">{license.licenseNumber}</span>
        </div>

        {license.photoUrl ? (
          <Image
            src={license.photoUrl}
            alt={`${license.name} ${license.surname}`}
            width={80}
            height={100}
            className="w-20 h-24 object-cover border border-black rounded-sm"
          />
        ) : (
          <div className="w-20 h-24 border border-black flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm font-bold">
              {license.name[0]}
              {license.surname[0]}
            </span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-between space-y-1">
        <div className="flex gap-1">
          <span className="font-semibold">Club:</span>
          <span className="flex-1 border-b border-dotted border-black text-[10px] font-semibold">
            {license.clubName}
          </span>
        </div>

        <div className="flex gap-1">
          <span className="font-semibold">Nom:</span>
          <span className="flex-1 border-b border-dotted border-black text-[10px] font-semibold">
            {license.surname}
          </span>
        </div>

        <div className="flex gap-1">
          <span className="font-semibold">Prénoms:</span>
          <span className="flex-1 border-b border-dotted border-black text-[10px]">
            {license.name}
          </span>
        </div>

        <div className="flex gap-1 flex-wrap">
          <span className="font-semibold">Né le:</span>
          <span className="border-b border-dotted border-black">
            {formatDate(new Date(license.dateOfBirth))}
          </span>
          <span className="font-semibold ml-1">À:</span>
          <span className="border-b border-dotted border-black">
            {license.state}
          </span>
        </div>

        <div className="flex gap-1">
          <span className="font-semibold">Âge:</span>
          <span className="flex-1 border-b border-dotted border-black">
            {getAge(license.dateOfBirth)} ans
          </span>
        </div>
      </div>
    </div>

    {/*
    <div className="text-blue-800 text-center py-1 font-semibold border-t border-gray-800 flex items-center gap-2 text-[9px] italic">
      <div className="flex-1 border-t border-blue-800"></div>
      <span>Ensemble pour la consolidation</span>
      <div className="flex-1 border-t border-blue-800"></div>
    </div> */}
  </div>
))}
          </div>
        </div>
      </div>
    </div>
  );
}
