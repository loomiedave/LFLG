'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Edit, Trash2, RefreshCw, Plus, User, Filter } from 'lucide-react'
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

export default function AdminDashboard() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchLicenses()
  }, [])

  const fetchLicenses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/licenses')
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

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette licence ?')) {
      return
    }

    try {
      setDeleteLoading(id)
      const response = await fetch(`/api/licenses/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete license')
      }

      setLicenses(licenses.filter(license => license.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setDeleteLoading(null)
    }
  }

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = searchTerm === '' || 
      license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.clubName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || license.status === statusFilter
    const matchesType = typeFilter === 'all' || license.licenseType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

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

  const stats = {
    total: licenses.length,
    active: licenses.filter(l => l.status === 'ACTIVE').length,
    expired: licenses.filter(l => l.status === 'EXPIRED').length,
    players: licenses.filter(l => l.licenseType === 'PLAYER').length,
    coaches: licenses.filter(l => l.licenseType === 'COACH').length
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestion des licences
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Administration des licences de la Fédération Togolaise de Football
          </p>
        </div>
        <Link
          href="/admin/create"
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouvelle licence
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Actives</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.expired}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Expirées</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.players}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Joueurs</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.coaches}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Entraîneurs</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, licence ou club..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-auto"
              >
                <option value="all">Tous les statuts</option>
                <option value="ACTIVE">Active</option>
                <option value="EXPIRED">Expirée</option>
                <option value="SUSPENDED">Suspendue</option>
                <option value="REVOKED">Révoquée</option>
              </select>
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="all">Tous les types</option>
              <option value="PLAYER">Joueur</option>
              <option value="COACH">Entraîneur</option>
            </select>
          </div>
        </div>
      </div>

      {/* License List */}
      {loading ? (
        <div className="card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des licences...</p>
        </div>
      ) : error ? (
        <div className="card p-8 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button onClick={fetchLicenses} className="btn-primary">
            Réessayer
          </button>
        </div>
      ) : filteredLicenses.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
              ? 'Aucune licence ne correspond aux critères de recherche.'
              : 'Aucune licence enregistrée.'
            }
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Joueur/Entraîneur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Licence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Club
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date d&apos;inscription
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLicenses.map((license) => (
                  <tr key={license.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {license.photoUrl ? (
                          <img
                            src={license.photoUrl}
                            alt={`${license.name} ${license.surname}`}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {license.name} {license.surname}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {license.licenseType === 'PLAYER' ? 'Joueur' : 'Entraîneur'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {license.licenseNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {license.clubName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {license.district}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                        {getStatusText(license.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(new Date(license.registrationDate))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/license/${license.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                          title="Voir"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`/admin/edit/${license.id}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/renew/${license.id}`}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                          title="Renouveler"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(license.id)}
                          disabled={deleteLoading === license.id}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50"
                          title="Supprimer"
                        >
                          {deleteLoading === license.id ? (
                            <div className="w-4 h-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}