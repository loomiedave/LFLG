import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function Footer () {
    return(
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Registre des Licences Footballeurs
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Système officiel de la Fédération Togolaise de Football et de la
              Ligue de Football Lomé Golfe
            </p>

            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400 mb-2">
                © {new Date().getFullYear()} Fédération Togolaise de Football -
                Ligue de Football Lomé Golfe
              </p>
              <p className="text-sm text-gray-500">
                Pour toute question concernant les licences, veuillez{" "}
                <Link
                  href="/contact"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                  contacter l&apos;administration
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
}