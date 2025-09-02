'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, FileText, Clock } from 'lucide-react'
import { formatDate, formatDateShort } from '@/lib/utils'

interface Renewal {
  id: string
  season: string
  renewalDate: string
  notes?: string
}

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
  renewals: Renewal[]
}

export default function LicensePage() {
  const params = useParams()
  const [license, setLicense] = useState<License | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchLicense() {
      try {
        setLoading(true)
        const response = await fetch(`/api/licenses/${params.id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch license')
        }

        setLicense(data.license)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchLicense()
    }
  }, [params.id])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement de la licence...</p>
        </div>
      </div>
    )
  }

  if (error || !license) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Licence introuvable
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || 'Cette licence n\'existe pas ou a été supprimée.'}
          </p>
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  const loremText1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  const loremText2 = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

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
                Licence Officielle
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {license.name} {license.surname} - N° {license.licenseNumber}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* License Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Fédération Togolaise de Football
              </h2>
              <p className="text-blue-100">
                Ligue de Football Lomé Golfe
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-100">Licence N°</p>
              <p className="text-2xl font-bold">{license.licenseNumber}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-blue-100 text-sm">Nom complet</p>
                <p className="text-xl font-semibold">{license.name} {license.surname}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Type de licence</p>
                <p className="font-medium">
                  {license.licenseType === 'PLAYER' ? 'Joueur' : 'Entraîneur'}
                </p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Club</p>
                <p className="font-medium">{license.clubName}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">District</p>
                <p className="font-medium">{license.district}</p>
              </div>
            </div>

            <div className="flex justify-center">
              {license.photoUrl ? (
                <img
                  src={license.photoUrl}
                  alt={`${license.name} ${license.surname}`}
                  className="w-32 h-40 object-cover rounded-lg border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-40 bg-white/20 rounded-lg border-4 border-white flex items-center justify-center">
                  <User className="w-12 h-12 text-white/70" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations personnelles
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date de naissance</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(new Date(license.dateOfBirth))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Adresse</p>
                <p className="font-medium text-gray-900 dark:text-white">{license.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">État</p>
                <p className="font-medium text-gray-900 dark:text-white">{license.state}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Statut de la licence
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Statut actuel</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(license.status)}`}>
                  {getStatusText(license.status)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date d&apos;enregistrement</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(new Date(license.registrationDate))}
                </p>
              </div>
              {license.expiryDate && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date d&apos;expiration</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(new Date(license.expiryDate))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Renewal History */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Historique des renouvellements
          </h3>

          {/* Information Text */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{loremText1}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{loremText2}</p>
          </div>

          {/* Renewal Sections */}
          <div className="grid md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }, (_, index) => {
              const renewal = license.renewals[index]
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    renewal
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Saison {index + 1}
                    </p>
                    {renewal ? (
                      <>
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                          {renewal.season}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDateShort(new Date(renewal.renewalDate))}
                        </p>
                        {renewal.notes && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                            {renewal.notes}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Non renouvelé
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}