import Link from 'next/link'
import { ArrowLeft } from "lucide-react";


export default function Header () {
    return (
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Transferts et Prêts
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Gestion des mouvements de joueurs
              </p>
            </div>
          </div>
        </div>
      </header>
    )
}