// app/search/SearchContent.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowLeft, User, Calendar, MapPin, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface License {
  id: string
  licenseNumber: string
  licenseType: 'PLAYER' | 'COACH'
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED'
  name: string
  surname: string
  dateOfBirth: string
  address: string
  state: string
  district: string
  clubName: string
  registrationDate: string
  expiryDate?: string
  photoUrl?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renewals: any[]
}

export default function SearchContent() {
  const searchParams = useSearchParams()
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const searchTerm = searchParams.get('name') || searchParams.get('licenseNumber') || ''
  const searchType = searchParams.get('name') ? 'name' : 'license'

  useEffect(() => {
    async function fetchLicenses() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        
        if (searchParams.get('name')) {
          params.set('name', searchParams.get('name')!)
        }
        if (searchParams.get('licenseNumber')) {
          params.set('licenseNumber', searchParams.get('licenseNumber')!)
        }

        const response = await fetch(`/api/licenses?${params.toString()}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch licenses')
        }

        setLicenses(data.licenses)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (searchTerm) {
      fetchLicenses()
    }
  }, [searchParams, searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'EXPIRED':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20'
      case 'SUSPENDED':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
      case 'REVOKED':
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Active'
      case 'EXPIRED': return 'Expirée'
      case 'SUSPENDED': return 'Suspendue'
      case 'REVOKED': return 'Révoquée'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
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
                Résultats de recherche
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Recherche {searchType === 'name' ? 'par nom' : 'par numéro de licence'}: &apos;{searchTerm}&apos;
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Recherche en cours...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Erreur de recherche
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        ) : licenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Aucun résultat trouvé
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Aucune licence ne correspond à votre recherche &apos;{searchTerm}&apos;
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {licenses.length} licence{licenses.length > 1 ? 's' : ''} trouvée{licenses.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {licenses.map((license) => (
                <div key={license.id} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {license.photoUrl ? (
                        <img
                          src={license.photoUrl}
                          alt={`${license.name} ${license.surname}`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {license.name} {license.surname}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {license.licenseType === 'PLAYER' ? 'Joueur' : 'Entraîneur'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        N° {license.licenseNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {license.clubName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Né le {formatDate(new Date(license.dateOfBirth))}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(license.status)}`}>
                      {getStatusText(license.status)}
                    </span>
                    <Link
                      href={`/license/${license.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}