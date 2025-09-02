'use client'

import { useState } from 'react'
import { Search, FileText, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<'name' | 'license'>('name')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    
    const params = new URLSearchParams()
    if (searchType === 'name') {
      params.set('name', searchTerm)
    } else {
      params.set('licenseNumber', searchTerm)
    }
    
    window.location.href = `/search?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Fédération Togolaise de Football
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Ligue de Football Lomé Golfe
              </p>
            </div>
            <Link
              href="/admin"
              className="btn-primary flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Administration
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-full">
              <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Registre des Licences Footballeurs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Recherchez et vérifiez les licences officielles des joueurs et entraîneurs 
            de la Fédération Togolaise de Football
          </p>
        </div>

        {/* Search Form */}
        <div className="card p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Type de recherche
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="searchType"
                    value="name"
                    checked={searchType === 'name'}
                    onChange={(e) => setSearchType(e.target.value as 'name')}
                    className="mr-2"
                  />
                  Par nom
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="searchType"
                    value="license"
                    checked={searchType === 'license'}
                    onChange={(e) => setSearchType(e.target.value as 'license')}
                    className="mr-2"
                  />
                  Par numéro de licence
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {searchType === 'name' ? 'Nom du joueur/entraîneur' : 'Numéro de licence'}
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchType === 'name' ? 'Entrez le nom ou prénom' : 'Entrez le numéro de licence'}
                  className="input flex-1"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Rechercher
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Licences Actives
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Toutes les licences valides et en cours
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Recherche Rapide
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Vérification instantanée des licences
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Sécurisé
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Base de données officielle protégée
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>
            © 2025 Fédération Togolaise de Football - Ligue de Football Lomé Golfe
          </p>
          <p className="mt-2 text-sm">
            Pour toute question concernant les licences, veuillez contacter l&apos;administration.
          </p>
        </div>
      </main>
    </div>
  )
}