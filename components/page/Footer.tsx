import Link from "next/link";
import { FileText } from "lucide-react";

export default function Footer() {

  const devSite = process.env.NEXT_PUBLIC_DEV_SITE;

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Système officiel de DISTRICT PREFECTORAL DE FOOTBALL LOME-GOLFE
          </p>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} Fédération Togolaise de Football -
              DISTRICT PREFECTORAL DE FOOTBALL LOME-GOLFE
            </p>
            <p className="text-sm text-gray-500">
              Pour toute question concernant les licences , veuillez{" "}
              <Link
                href="tel:+22899465581"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                contacter l&apos;administration
              </Link>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Développé par{" "}
              <a
                href={devSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Benjamin Olumide David
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
