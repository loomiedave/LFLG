import Image from "next/image";

export default function PrintPageHeader() {
  return (
    <div className="flex items-center bg-white justify-between gap-4 border-gray-400 mb-1">
      <div className="flex-shrink-0">
        <Image
          src="/centerImage.png"
          alt="Right Logo"
          width={96}
          height={96}
          className="h-18 w-auto lg:h-24"
          priority
        />
      </div>

      <div className="flex-1 px-2">
        <div className="flex flex-col justify-center items-center h-full">
          <h3 className="text-md font-medium text-gray-800 text-center leading-tight">
            Fédération togolaise de football
          </h3>

          <h1 className="text-base text-lg font-bold text-primary text-center leading-tight max-w-full">
            LIGUE REGIONALE DE FOOTBALL LOME-GOLFE
          </h1>

          <h2 className="text-sm font-semibold text-gray-900 text-center leading-tight">
            DISTRICT PRÉFECTORAL DE FOOTBALL LOME-GOLFE
          </h2>
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="flex flex-col items-center mt-1">
          <Image
            src="/LOGO.png"
            alt="Right Logo"
            width={96}
            height={96}
            className="h-24 w-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
