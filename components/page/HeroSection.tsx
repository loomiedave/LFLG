import { FileText, Trophy, Users, Calendar } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden ">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: "url('/backgroundImg.jpg')",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8 opacity-50">
            <div className="relative">
              <img
                src="/rightLogo.jpg"
                alt="Logo"
                className="h-32 w-auto object-contain rounded-2xl shadow-lg"
                style={{ height: "30vh", maxHeight: "200px" }}
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            DISTRICT PREFECTORAL DE FOOTBALL LOME-GOLFE
          </h1>

          {/* Subtitle 
          <p className="text-xl lg:text-2xl text-primary font-bold max-w-3xl mx-auto mb-8 leading-relaxed">
            COMMITE ZONE 4 : NYEKONAKPOE-KODJOVIAKOPE-HANOUKOPE
          </p> */}

          {/* Call to Action */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Vérifiez une licence maintenant
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Recherchez par nom ou numéro de licence pour vérifier
              l&apos;authenticité et le statut d&apos;une licence officielle
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-500 dark:text-gray-400">
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                Licences joueurs
              </span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                Licences entraîneurs
              </span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                Validation instantanée
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
