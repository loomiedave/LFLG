import Image from "next/image";

export default function PrintPageHeader2() {
  return (
    <div className="flex items-center justify-between bg-white border-gray-300 mb-1 py-1">
      {/* Left logo */}
      <div className="flex-shrink-0">
        <Image
          src="/centerImage.png"
          alt="Left Logo"
          width={36}
          height={36}
          className="h-9 w-auto"
          priority
        />
      </div>

      {/* Center text (tight, no wrap) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center leading-tight whitespace-nowrap overflow-hidden">
        <h3 className="text-[7px] font-medium text-gray-800 truncate">
          Fédération togolaise de football
        </h3>
        <h1 className="text-[7px] font-bold text-primary truncate">
          LIGUE REGIONALE DE FOOTBALL LOME-GOLFE
        </h1>
        <h2 className="text-[6px] font-semibold text-gray-900 truncate">
          DISTRICT PRÉFECTORAL DE FOOTBALL LOME-GOLFE
        </h2>
        <p className="text-blue-600 font-medium text-[6px]">Saison 2024-2029</p>
      </div>

      {/* Right logo */}
      <div className="flex-shrink-0">
        <Image
          src="/LOGO.png"
          alt="Right Logo"
          width={56}
          height={56}
          className="h-9"
          priority
        />
      </div>
    </div>
  );
}
